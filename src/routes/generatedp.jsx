import { useParams, Link } from "react-router-dom";
import { createStyles, Text, Button, Container } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({}));
export default function GenerateDP() {
  let { bannerid } = useParams();
  const { classes } = useStyles();
  return (
    <Container>
      <Text order="1"> Your banner was created successfully!</Text>
      <Text>{bannerid}</Text>
      <div>
        <Button color="indigo" size="md" component={Link} to="/createdp">
          Create New Banner
        </Button>
      </div>
    </Container>
  );
}
