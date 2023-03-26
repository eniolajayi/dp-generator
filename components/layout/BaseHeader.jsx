import { Container, createStyles } from "@mantine/core";
import Link from "next/link";

const HEADER_HEIGHT = "50px";
const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    width: "100%",
    height: HEADER_HEIGHT,
    backgroundColor: "#000000",
  },
  nav: {
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    height: HEADER_HEIGHT,
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: "600",
  },
  navLink: {
    color: "#fff",
    display: "block",
    padding: "0 0.875rem",
    textDecoration: "none",
    lineHeight: HEADER_HEIGHT,
  },
}));
export default function Header() {
  const { classes, cx } = useStyles();
  return (
    <header className={classes.header}>
      <Container>
        <nav className={classes.nav}>
          <Link href="/" className={cx(classes.logo, classes.navLink)}>
            DP Generator
          </Link>

          <Link href="/help" className={classes.navLink}>
            How it works?
          </Link>
        </nav>
      </Container>
    </header>
  );
}
