import { Text, Container, Box, useMantineTheme } from "@mantine/core";
export default function Footer() {
  const theme = useMantineTheme();
  const getCurrentYear = () => {
    let date = new Date();
    return date.getFullYear();
  };

  return (
    <Box component={"footer"} sx={{ marginBlockStart: theme.spacing.sm }}>
      <Container sx={{ textAlign: "center", minHeight: "50px" }}>
        <Text component={"span"}>
          copyright (c){getCurrentYear()}. all rights reserved
        </Text>
      </Container>
    </Box>
  );
}
