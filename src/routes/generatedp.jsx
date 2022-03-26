import { useParams, Link } from "react-router-dom";
import {
  createStyles,
  Text,
  Button,
  Container,
  Group,
  Title,
} from "@mantine/core";
import { getBannerInfo } from "../utils/api";
import { useEffect, useState } from "react";
import { PlusSquare } from "../components/icons";

const useStyles = createStyles((theme, _params, getRef) => ({}));
export default function GenerateDP() {
  const [data, setData] = useState({});
  let { bannerid } = useParams();

  useEffect(() => {
    getBannerInfo(bannerid)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [bannerid]);

  const { classes } = useStyles();
  return (
    <Container sx={{ marginBottom: "2rem" }}>
      <Title order={1}>{data.Name}</Title>
      <Title order={3}>Description</Title>
      <Text size="lg" lineClamp={4}>
        {data.Description}
      </Text>
      <img src={data.Banner} alt="banner" />
      <Group>
        <Button
          variant="subtle"
          color="indigo"
          size="sm"
          leftIcon={<PlusSquare />}
        >
          Upload Image
        </Button>
        <Text color="indigo">
          your image will replace the highlighted portion of the banner
        </Text>
      </Group>
      <Group>
        <Button color="teal" size="md">
          Generate Banner
        </Button>
        <Button color="indigo" size="md" component={Link} to="/createdp">
          Create New Banner
        </Button>
      </Group>
    </Container>
  );
}
