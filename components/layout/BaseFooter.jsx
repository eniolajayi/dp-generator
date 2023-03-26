import { Container } from "@mantine/core";
export default function Footer() {
  const getCurrentYear = () => {
    let date = new Date();
    return date.getFullYear();
  };

  return (
    <footer style={{ marginTop: "2rem" }}>
      <Container sx={{ textAlign: "center", minHeight: "50px" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
          copyright(c){getCurrentYear()}. all rights reserved
        </span>
      </Container>
    </footer>
  );
}
