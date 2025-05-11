import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface ScheduleCallExpertProps {
  expertName: string;
  userName: string;
  date: string;
  time: string;
  duration: string;
  callLink: string;
  meetingId?: string;
  meetingPassword?: string;
  userProfile?: string;
}

export const ScheduleCallExpert = ({
  expertName = "Expert",
  userName = "User",
  date = "January 1, 2024",
  time = "10:00 AM",
  duration = "One hour",
  callLink = "https://meet.google.com/xxx-yyyy-zzz",
  meetingId,
  meetingPassword,
  userProfile,
}: ScheduleCallExpertProps) => {
  const previewText = `New mentorship session scheduled with ${userName} on ${date} at ${time}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section
            style={{
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            <Img
              src={
                "https://res.cloudinary.com/dmlghnnuk/image/upload/v1745168888/xpertzone_x0myte.png"
              }
              width="80"
              height="auto"
              alt="XpertZone"
              style={logo}
            />
          </Section>
          <Section
            style={{
              backgroundColor: "#000000",
              borderRadius: "8px 8px 0 0",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <Heading style={h1}>New Mentorship Session Scheduled</Heading>
            <Text style={heroText}>You have a new session with {userName}</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={paragraph}>Hi {expertName},</Text>
            <Text style={paragraph}>
              A new mentorship session has been scheduled. Here are the details:
            </Text>

            <Section style={detailsSection}>
              <Row>
                <Column style={detailColumn}>
                  <Text style={detailLabel}>Date</Text>
                  <Text style={detailValue}>{date}</Text>
                </Column>
                <Column style={detailColumn}>
                  <Text style={detailLabel}>Time</Text>
                  <Text style={detailValue}>{time}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={detailColumn}>
                  <Text style={detailLabel}>Duration</Text>
                  <Text style={detailValue}>{duration}</Text>
                </Column>
                <Column style={detailColumn}>
                  <Text style={detailLabel}>Mentee</Text>
                  <Text style={detailValue}>{userName}</Text>
                </Column>
              </Row>
            </Section>

            {userProfile && (
              <Section style={profileSection}>
                <Text style={sectionTitle}>Mentee Profile</Text>
                <Text style={paragraph}>
                  <Link href={userProfile} style={link}>
                    View {userName}'s Profile
                  </Link>
                </Text>
              </Section>
            )}

            <Section style={callInfoSection}>
              <Text style={callInfoTitle}>Call Information</Text>
              <Text style={paragraph}>
                Join the call using the button below or copy the link:
              </Text>
              <Text style={callLinkStyle}>{callLink}</Text>
              {meetingId && (
                <Text style={meetingDetails}>Meeting ID: {meetingId}</Text>
              )}
              {meetingPassword && (
                <Text style={meetingDetails}>Password: {meetingPassword}</Text>
              )}
            </Section>

            <Section style={buttonSection}>
              <Button style={button} href={callLink}>
                Join Call
              </Button>
            </Section>

            <Section style={preparationSection}>
              <Text style={sectionTitle}>Session Preparation</Text>
              <ul style={tipsList}>
                <li style={tipItem}>
                  Review the mentee's profile and background
                </li>
                <li style={tipItem}>Prepare your workspace and equipment</li>
                <li style={tipItem}>Have your notes and resources ready</li>
                <li style={tipItem}>
                  Join 5 minutes before the scheduled time
                </li>
              </ul>
            </Section>

            <Hr style={hr} />

            <Section style={helpSection}>
              <Text style={helpText}>
                Need to reschedule? Contact us at{" "}
                <Link href="mailto:support@xpertzone.com" style={link}>
                  support@xpertzone.com
                </Link>
              </Text>
            </Section>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              © 2025 XpertZone, Inc. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link href={"https://xpertzone-web.vercel.app"} style={smallLink}>
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link
                href={"https://xpertzone-web.vercel.app/"}
                style={smallLink}
              >
                Terms of Service
              </Link>
            </Text>
            <Text style={address}>Xpert Zone, Inc.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ScheduleCallExpert;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto",
};

const h1 = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const heroText = {
  color: "#ffffff",
  fontSize: "18px",
  lineHeight: "1.5",
  margin: "0",
};

const contentSection = {
  backgroundColor: "#ffffff",
  borderRadius: "0 0 8px 8px",
  padding: "32px",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const detailsSection = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const detailColumn = {
  padding: "12px",
};

const detailLabel = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "0 0 4px",
};

const detailValue = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0",
};

const profileSection = {
  margin: "24px 0",
  padding: "16px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
};

const callInfoSection = {
  margin: "32px 0",
};

const callInfoTitle = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const callLinkStyle = {
  color: "#4f46e5",
  fontSize: "14px",
  wordBreak: "break-all" as const,
  margin: "0 0 16px",
};

const meetingDetails = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "4px 0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  padding: "12px 24px",
  textDecoration: "none",
  textTransform: "uppercase" as const,
};

const preparationSection = {
  margin: "32px 0",
};

const sectionTitle = {
  color: "#1f2937",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const tipsList = {
  margin: "0",
  padding: "0 0 0 24px",
};

const tipItem = {
  color: "#525f7f",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "8px 0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const helpSection = {
  textAlign: "center" as const,
};

const helpText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
};

const link = {
  color: "#4f46e5",
  textDecoration: "underline",
};

const footerSection = {
  textAlign: "center" as const,
  margin: "32px 0 0",
};

const footerText = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};

const footerLinks = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};

const smallLink = {
  color: "#6b7280",
  textDecoration: "underline",
};

const address = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "1.5",
  fontStyle: "normal" as const,
  margin: "0",
};
