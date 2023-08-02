import { Button, Container, createStyles, Title, Text, Box } from "@mantine/core";
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
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
        fontWeight: 900,
        width: "min(30ch, 100%)",
        textAlign: "center",
        textTransform: "uppercase",
        marginBottom: "3rem",
    },
    highlight: {
        color: theme.colors.teal[6],
    },
}));

const customButtonStyles = (theme) => ({
    root: {
        backgroundColor: theme.colors.teal[6],
        fontWeight: 400,
        fontSize: "0.875rem",
        minWidth: "186px",
        maxWidth: "186px",
        "&:hover": {
            backgroundColor: theme.colors.teal[6],
        },
    },
})

function HomePage() {
    const { classes, theme } = useStyles();
    return (
            <Box sx={{background: theme.colors.gray[0], backgroundImage:"radial-gradient(at 0% 0%, hsla(139,100%,76%,1) 0, transparent 50%)"}}>
            <Container px="xs">
                <main className={classes.main}>
                    <Title className={classes.heading} order={1} size="h1">
                        Create your own{" "}
                        <Text inherit className={classes.highlight} component={"span"}>
                            {" "}
                            personalized dp banner{" "}
                        </Text>{" "}
                        with ease
                    </Title>
                    <Button
                        component={Link}
                        href="/banner/create"
                        styles={customButtonStyles}
                        size="lg"
                    >
                        Get Started
                    </Button>
                </main>
            </Container>
            </Box>
    )
}

export default HomePage