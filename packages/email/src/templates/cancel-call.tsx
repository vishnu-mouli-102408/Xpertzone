import {
  Body,
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

interface CancelCallEmailProps {
  userName: string;
  expertName: string;
  date: string;
  time: string;
  duration: string;
  reason?: string;
  isExpert?: boolean;
}

export const CancelCallEmail = ({
  userName = "User",
  expertName = "Expert",
  date = "January 1, 2024",
  time = "10:00 AM",
  duration = "One hour",
  reason,
  isExpert = false,
}: CancelCallEmailProps) => {
  const previewText = `Your call scheduled for ${date} at ${time} has been cancelled`;

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
            <Heading style={h1}>Call Cancelled</Heading>
            <Text style={heroText}>
              {isExpert
                ? `Your session with ${userName} has been cancelled`
                : `Your session with ${expertName} has been cancelled`}
            </Text>
          </Section>

          <Section style={contentSection}>
            <Text style={paragraph}>
              Hi {isExpert ? expertName : userName},
            </Text>
            <Text style={paragraph}>
              We're writing to inform you that the following mentorship session
              has been cancelled:
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
                  <Text style={detailLabel}>
                    {isExpert ? "User" : "Expert"}
                  </Text>
                  <Text style={detailValue}>
                    {isExpert ? userName : expertName}
                  </Text>
                </Column>
              </Row>
            </Section>

            {reason && (
              <Section style={reasonSection}>
                <Text style={sectionTitle}>Cancellation Reason</Text>
                <Text style={paragraph}>{reason}</Text>
              </Section>
            )}

            <Section style={nextStepsSection}>
              <Text style={sectionTitle}>Next Steps</Text>
              <ul style={tipsList}>
                <li style={tipItem}>
                  You can schedule a new session at your convenience
                </li>
                <li style={tipItem}>
                  Any payments made will be refunded according to our
                  cancellation policy
                </li>
                <li style={tipItem}>
                  If you need to reschedule, please do so at least 24 hours
                  before the session
                </li>
              </ul>
            </Section>

            <Hr style={hr} />

            <Section style={helpSection}>
              <Text style={helpText}>
                Need assistance? Contact us at{" "}
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

export default CancelCallEmail;

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

const reasonSection = {
  margin: "32px 0",
  padding: "24px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
};

const nextStepsSection = {
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
