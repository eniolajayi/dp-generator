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
  const [file, setFile] = useState();
  const [area, setArea] = useState();
  const [data, setData] = useState({});
  const [imgUrl, setImgUrl] = useState();
  const notifications = useNotifications();
  const { classes } = useStyles();
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

  const getBanner = () => {
    let data = new FormData();
    data.append("file_uploaded", file);
    if (data && bannerid) {
      makeBanner(data, bannerid)
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

  const onFileDrop = (files) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
    getBanner();
  };

  const handleClick = () => {};

  return (
    <Container sx={{ marginBottom: "2rem" }}>
      <div className={classes.header}>
        <Title order={1}>{data.Name}</Title>
        <Spoiler maxHeight={200} showLabel="Read more" hideLabel="Hide">
          <Text size="lg" lineClamp={4}>
            {data.Description}
          </Text>
        </Spoiler>
      </div>
      <section>
        <Text color="indigo" size="sm" sx={{ marginBottom: "0.87rem" }}>
          Create your personalized dp banner
        </Text>
        {/*TODO solve for round crop */}
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
      </section>
      <Dropzone
        multiple={false}
        maxSize={MAX_FILE_SIZE}
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        classNames={{
          root: classes.dropzoneRoot,
        }}
        onDrop={(files) => onFileDrop(files)}
        onReject={(files) => {
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: "file did not meet restrictions, Try again.",
          });
        }}
      >
        {(status) => dropzoneChildren(status)}
      </Dropzone>

      <Group>
        <Button
          disabled={Boolean(!imgUrl)}
          color="teal"
          size="md"
          onClick={handleClick}
        >
          Download Banner
        </Button>
        <Button color="indigo" size="md" component={Link} to="/createdp">
          Create New Banner
        </Button>
      </Group>
    </Container>
  );
}

export const dropzoneChildren = (status) => {
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
        your image will replace the highlighted portion of the banner
      </Text>
    </Group>
  );
};
