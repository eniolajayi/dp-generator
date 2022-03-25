import { useParams, Link } from "react-router-dom";
import { createStyles, Text, Button, Container } from "@mantine/core";
import { getBannerInfo } from "../utils/api";
import { useState } from "react";

const useStyles = createStyles((theme, _params, getRef) => ({}));
export default function GenerateDP() {
  const [data, setData] = useState({});
  let { bannerid } = useParams();

  getBannerInfo(bannerid)
    .then((res) => {
      console.table(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.error(err);
    });

  const { classes } = useStyles();
  return (
    <Container>
      <Text order="1"> Your banner was created successfully!</Text>
      <Text>{bannerid}</Text>
      <img src={data.Banner} alt="banner" />
      <Text>{data.Name}</Text>
      <Text>{data.Description}</Text>
      <div>
        <Button color="indigo" size="md" component={Link} to="/createdp">
          Create New Banner
        </Button>
      </div>
    </Container>
  );
}
