import { Button, Container, createStyles, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => ({
  main: {
    width: "100%",
    height: "80vh",
    maxHeight: "700px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  heading: {
    width: "min(30ch, 100%)",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: "3rem",
  },
}));
export default function Home() {
  const { classes } = useStyles();
  return (
    <Container sx={{}} px="xs">
      <main className={classes.main}>
        <Title className={classes.heading} order={1}>
          Create your own personalized dp banner with ease
        </Title>
        <Button
          component={Link}
          to="/generator"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.colors.teal[6],
              fontWeight: "400",
              fontSize: "0.875rem",
              minWidth: "186px",
              maxWidth: "186px",
              "&:hover": {
                backgroundColor: theme.colors.teal[6],
              },
            },
          })}
          size="lg"
        >
          Get Started
        </Button>
      </main>
    </Container>
  );
}
