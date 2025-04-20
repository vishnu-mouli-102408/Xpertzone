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

export const WelcomeEmail = ({ name = "Hi there" }) => {
  const previewText =
    "Welcome to XpertZone - Your Gateway to Expert Mentorship";

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
            <Heading style={h1}>Welcome to Xpert Zone, {name}!</Heading>
            <Text style={heroText}>
              Your journey to connecting with industry experts and mentors
              begins now.
            </Text>
          </Section>

          <Section style={contentSection}>
            <Text style={paragraph}>
              We're excited to have you join our community where knowledge
              sharing and professional growth are just a few clicks away. With
              XpertZone, you can:
            </Text>

            <Section style={featureSection}>
              <Row>
                <Column
                  style={{
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <Img
                    src={
                      "https://res.cloudinary.com/dmlghnnuk/image/upload/v1745169479/chat_rzuuh0.png"
                    }
                    width="48"
                    height="48"
                    alt="Chat"
                    style={featureIcon}
                  />
                  <Text style={featureTitle}>Chat With Experts</Text>
                  <Text style={featureDescription}>
                    Get real-time advice through our messaging platform
                  </Text>
                </Column>
                <Column
                  style={{
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <Img
                    src={
                      "https://res.cloudinary.com/dmlghnnuk/image/upload/v1745169479/video-camera_pokwe3.png"
                    }
                    width="48"
                    height="48"
                    alt="Video Call"
                    style={featureIcon}
                  />
                  <Text style={featureTitle}>One-on-One Video Calls</Text>
                  <Text style={featureDescription}>
                    Schedule face-to-face mentorship sessions
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column
                  style={{
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <Img
                    src={
                      "https://res.cloudinary.com/dmlghnnuk/image/upload/v1745169479/network_lupkyx.png"
                    }
                    width="48"
                    height="48"
                    alt="Network"
                    style={featureIcon}
                  />
                  <Text style={featureTitle}>Expand Your Network</Text>
                  <Text style={featureDescription}>
                    Connect with professionals across industries
                  </Text>
                </Column>
                <Column
                  style={{
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <Img
                    src={
                      "https://res.cloudinary.com/dmlghnnuk/image/upload/v1745169479/growth_glva2k.png"
                    }
                    width="48"
                    height="48"
                    alt="Learn"
                    style={featureIcon}
                  />
                  <Text style={featureTitle}>Accelerate Growth</Text>
                  <Text style={featureDescription}>
                    Learn from those who've been there before
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section
              style={{
                margin: "32px 0",
                textAlign: "center",
              }}
            >
              <Text style={paragraph}>
                Ready to start your mentorship journey? Complete your profile
                and browse our expert directory today!
              </Text>
              <Button
                style={{
                  backgroundColor: "#000000",
                  borderRadius: "6px",
                  color: "#ffffff",
                  fontSize: "16px",
                  fontWeight: "600",
                  padding: "12px 24px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
                href={"https://xpertzone-web.vercel.app"}
              >
                Get Started Now
              </Button>
            </Section>

            <Hr style={hr} />

            <Section
              style={{
                textAlign: "center",
              }}
            >
              <Text style={helpText}>
                Have questions? Our support team is here to help at{" "}
                <Link href="mailto:support@xpertzone.com" style={link}>
                  support@xpertzone.com
                </Link>
              </Text>
            </Section>
          </Section>

          <Section
            style={{
              textAlign: "center",
              margin: "32px 0 0",
            }}
          >
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
              </Link>{" "}
              •{" "}
            </Text>
            <Text style={address}>Xpert Zone, Inc.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

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

const featureSection = {
  margin: "24px 0",
};

const featureIcon = {
  margin: "0 auto 8px",
};

const featureTitle = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 8px",
};

const featureDescription = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
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
  fontStyle: "normal",
  margin: "0",
};
