// TODO Apply DRY principle, clean up code
import { useParams, Link } from "react-router-dom";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useNotifications } from "@mantine/notifications";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  createStyles,
  Text,
  Button,
  Container,
  Group,
  Title,
  Spoiler,
  Image,
  Code,
  Paper,
  Box,
  Skeleton,
} from "@mantine/core";
import { getBannerInfo, makeBanner } from "../utils/api";
import { useEffect, useState } from "react";
import { PlusSquare } from "../components/icons";

const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    width: "100%",
    height: "auto",
    margin: "1.2rem 0",
  },
  dropzoneRoot: {
    border: "none",
    marginTop: "1rem",
    marginBottom: "2rem",
  },
}));
export default function GenerateDP() {
  const MAX_FILE_SIZE = 60000000;
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState();
  const [data, setData] = useState({});
  const [imgUrl, setImgUrl] = useState();
  const notifications = useNotifications();
  const { classes } = useStyles();
  let { bannerid } = useParams();

  useEffect(() => {
    getBannerInfo(bannerid)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        notifications.showNotification({
          message: "An error occured!",
          color: "red",
        });
      });
  }, [bannerid, notifications]);

  const onFileDrop = (files) => {
    if (files && files.length > 0) {
      // setFile(files[0]);
      getBanner(files[0], bannerid);
    }
  };

  const getBanner = (file, id) => {
    let data = new FormData();
    data.append("file_uploaded", file);
    if (data && bannerid && file) {
      makeBanner(data, id)
        .then((res) => {
          if (res.status === 201) {
            notifications.showNotification({
              message: "Generated successfuly!",
              color: "teal",
            });
            setImgUrl(res.data.Image.url);
          }
        })
        .catch((err) => {
          notifications.showNotification({
            message: "An error occured!",
            color: "red",
          });
        });
    }
  };

  return (
    <Container sx={{ marginBottom: "2rem" }}>
      <Box>
        <Skeleton visible={loading}>
          <div className={classes.header}>
            <Title order={1}>{data.Name}</Title>
            <Spoiler maxHeight={200} showLabel="Read more" hideLabel="Hide">
              <Text size="lg" sx={{ width: "min(45ch, 100%)" }}>
                {data.Description}
              </Text>
            </Spoiler>
          </div>
        </Skeleton>
        <section>
          <Text color="indigo" size="sm" sx={{ marginBottom: "0.87rem" }}>
            Create your personalized dp banner
          </Text>
          {/*TODO solve for round crop */}
          <Skeleton visible={loading}>
            <ReactCrop crop={area} disabled={true} onChange={(c) => setArea(c)}>
              {Boolean(!imgUrl) ? (
                <Image
                  src={data.Banner}
                  alt="banner"
                  withPlaceholder
                  sx={(theme) => ({
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: `${data.Position_y}px`,
                      left: `${data.Position_x}px`,
                      background: theme.black,
                      width: `${data.Width}px`,
                      height: `${data.Height}px`,
                      opacity: "0.4",
                      zIndex: "3",
                    },
                  })}
                />
              ) : (
                <Image src={imgUrl} alt="new banner" />
              )}
            </ReactCrop>
          </Skeleton>
        </section>
        <Dropzone
          multiple={false}
          maxSize={MAX_FILE_SIZE}
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
          classNames={{
            root: classes.dropzoneRoot,
          }}
          onDrop={(files) => {
            notifications.showNotification({
              color: "teal",
              title: "File accepted",
              message: "processing.. please wait",
            });
            onFileDrop(files);
          }}
          onReject={(files) => {
            notifications.showNotification({
              color: "red",
              title: "Error",
              message: "file did not meet restrictions, Try again.",
            });
          }}
        >
          {(status, theme) => dropzoneChildren(status, theme)}
        </Dropzone>
        <Paper sx={{ margin: "2rem 0" }} shadow={"xs"} p="lg">
          <Text color="dark">
            Share this url to others, so they can create a customized dp using
            the banner above
          </Text>
          <Code color={"teal"} sx={{ fontSize: "1rem" }}>
            {window.location.href}
          </Code>
        </Paper>
        <Group>
          <Button
            disabled={Boolean(!imgUrl)}
            href={imgUrl}
            download="my_banner"
            target="_blank"
            color="teal"
            size="md"
            component="a"
            role={"button"}
          >
            Download Banner
          </Button>
          <Button color="indigo" size="md" component={Link} to="/createdp">
            Create New Banner
          </Button>
        </Group>
      </Box>
    </Container>
  );
}

export const dropzoneChildren = (status, theme) => {
  return (
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
        max(6mb), your image will replace the highlighted area
      </Text>
    </Group>
  );
};
