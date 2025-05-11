import { EMAIL_QUEUE_NAME, logger } from "@repo/common";
import { sendMail } from "@repo/email";
import ScheduleCallExpert from "@repo/email/templates/schedule-call-expert";
import ScheduleCallEmail from "@repo/email/templates/schedule-call-user";
import WelcomeEmail from "@repo/email/templates/welcome";
import { Redis } from "ioredis";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const maxRetries = 5;

export async function startEmailWorker(redis: Redis) {
  logger.info("[EmailWorker] Started");

  while (true) {
    try {
      const result = await redis.brpop(EMAIL_QUEUE_NAME, 0); // Wait for job

      if (result) {
        const [_queue, message] = result;
        const job = JSON.parse(message);
        logger.info(job, "[EmailWorker] Got job:");

        let retryCount = 0;
        let success = false;

        while (retryCount < maxRetries && !success) {
          try {
            const {
              email,
              name,
              subject,
              type,
              userName,
              expertName,
              date,
              time,
              callLink,
              userEmail,
              expertEmail,
            } = job;
            if (type === "welcome") {
              await sendMail({
                email,
                subject,
                react: WelcomeEmail({ name }),
              });
              success = true;
              logger.info("[EmailWorker-Welcome] Job processed successfully");
            }
            if (type === "schedule-call") {
              await Promise.all([
                sendMail({
                  email: userEmail,
                  subject,
                  react: ScheduleCallEmail({
                    userName,
                    expertName,
                    callLink,
                    date,
                    duration: "One hour",
                    time,
                  }),
                }),
                sendMail({
                  email: expertEmail,
                  subject,
                  react: ScheduleCallExpert({
                    userName,
                    expertName,
                    callLink,
                    date,
                    duration: "One hour",
                    time,
                  }),
                }),
              ]);

              success = true;
              logger.info(
                "[EmailWorker-ScheduleCall] Job processed successfully"
              );
            }
          } catch (err) {
            retryCount++;
            const backoffTime = Math.pow(2, retryCount) * 1000;
            logger.error(err, `[EmailWorker] Retry attempt ${retryCount}`);
            await delay(backoffTime);
          }
        }

        if (!success) {
          logger.error(
            "[EmailWorker] Max retries reached. Moving on to next job."
          );
        }
      }
    } catch (err) {
      logger.error(err, "[EmailWorker] Redis or processing error");
      await delay(3000); // prevent tight loop on redis failure
    }
  }
}
