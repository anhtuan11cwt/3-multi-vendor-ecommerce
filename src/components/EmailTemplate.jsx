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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

const socialLink = {
  color: "#52525b",
  fontSize: "12px",
  textDecoration: "none",
};

export default function EmailTemplate({
  name = "",
  redirectUrl = "",
  linkText = "Xác thực tài khoản",
}) {
  const verifyUrl = `${baseUrl}${redirectUrl}`;

  return (
    <Html>
      <Head />
      <Preview>Xác thực tài khoản của bạn</Preview>
      <Body style={{ backgroundColor: "#f4f4f5", fontFamily: "sans-serif" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            margin: "40px auto",
            maxWidth: "520px",
            padding: "32px 20px",
            width: "100%",
          }}
        >
          <Section>
            <Row>
              <Column>
                <Heading
                  style={{
                    color: "#18181b",
                    fontSize: "20px",
                    margin: "0 0 16px",
                  }}
                >
                  Chào {name},
                </Heading>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={{ color: "#3f3f46", fontSize: "14px" }}>
                  Cảm ơn bạn đã tạo tài khoản cùng chúng tôi. Vui lòng bấm vào
                  nút bên dưới để hoàn tất quá trình đăng ký:
                </Text>
              </Column>
            </Row>
            <Row>
              <Column align="center" style={{ padding: "24px 0" }}>
                <Button
                  href={verifyUrl}
                  style={{
                    backgroundColor: "#4d7c0f",
                    borderRadius: "6px",
                    color: "#ffffff",
                    display: "inline-block",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "12px 24px",
                    textDecoration: "none",
                  }}
                >
                  {linkText}
                </Button>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={{ color: "#71717a", fontSize: "12px" }}>
                  Nếu nút không hoạt động, hãy sao chép liên kết sau vào trình
                  duyệt:{" "}
                  <Link href={verifyUrl} style={{ color: "#4d7c0f" }}>
                    {verifyUrl}
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: "#e4e4e7", margin: "24px 0" }} />

          <Section>
            <Row>
              <Column align="center">
                <Link href={baseUrl} style={socialLink}>
                  Facebook
                </Link>
                {"  ·  "}
                <Link href={baseUrl} style={socialLink}>
                  Instagram
                </Link>
                {"  ·  "}
                <Link href={baseUrl} style={socialLink}>
                  YouTube
                </Link>
              </Column>
            </Row>
            <Row style={{ marginTop: "16px" }}>
              <Column align="center">
                <Img
                  alt="Logo"
                  height="32"
                  src={`${baseUrl}/favicon.svg`}
                  style={{ margin: "0 auto" }}
                  width="32"
                />
                <Text style={{ color: "#a1a1aa", fontSize: "12px" }}>
                  © {new Date().getFullYear()} Multi Vendor Marketplace. Tất cả
                  quyền được bảo lưu.
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
