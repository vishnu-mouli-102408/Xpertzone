import { Button, Html } from "@react-email/components";

export const Welcome = () => {
  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Welcome to Our Service!
      </Button>
    </Html>
  );
};

export default Welcome;
