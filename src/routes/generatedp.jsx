// TODO Apply DRY principle, clean up code
import { useParams, Link } from "react-router-dom";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useNotifications } from "@mantine/notifications";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useForm } from "@mantine/form";
import {
  createStyles,
  Text,
  Button,
  Container,
  Group,
  Title,
  Spoiler,
  Image,
  Paper,
  TextInput,
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
  input: {
    marginBottom: "1rem",
    width: "500px",
  },
  shareUrlWrapper: {
    overflowX: "scroll",
    maxWidth: "min(800px, 100%)",
    height: "80px",
    padding: "1rem 0.875rem",
  },
}));
export default function GenerateDP() {
  const MAX_FILE_SIZE = 60000000;
  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState();
  const [data, setData] = useState({});
  const [imgUrl, setImgUrl] = useState();
  const [file, setFile] = useState();
  const notifications = useNotifications();
  const shareUrl = window.location.href;
  const { classes } = useStyles();
  let { bannerid } = useParams();

  /* The generate dp page customized features
   for stax are controlled with these flags
   until support for text selection.*/
  let FOR_STAX;
  let FOR_STAX_CAMPUS;
  /* Custom banner id detection to seperate 
  stax banners from other banners */
  if (bannerid === "stax") {
    FOR_STAX = true;
    FOR_STAX_CAMPUS = false;
  } else if (bannerid === "staxcampus") {
    FOR_STAX = true;
    FOR_STAX_CAMPUS = true;
  } else {
    FOR_STAX = false;
    FOR_STAX_CAMPUS = false;
  }

  useEffect(() => {
    getBannerInfo(bannerid)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bannerid]);

  const form = useForm({
    initialValues: {
      name: "",
      university: "",
      link: "",
    },
  });
  const onFileDrop = (files) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const isReady = () => {
    return (
      file &&
      form.values.name !== "" &&
      (form.values.university !== "" || form.values.link !== "")
    );
  };

  const handleSubmit = (values) => {
    console.log(values);
    let data = new FormData();
    data.append("file_uploaded", file);
    data.append("Name", values.name);
    data.append("University", values.university);
    data.append("Slug", bannerid);
    if (data && values && file) {
      makeBanner(data, bannerid)
        .then((res) => {
          if (res.status === 201) {
            notifications.showNotification({
              message: "Generated successfuly!",
              color: "teal",
            });
            setImgUrl(res.data.Image.secure_url);
          }
        })
        .catch((err) => {
          notifications.showNotification({
            message: "An error occured!",
            color: "red",
          });
          console.log(err);
        });
    }
  };

  return (
    <Container sx={{ marginBottom: "2rem" }}>
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
                    content: `${
                      file ? "'Uploaded file exists'" : "'No file uploaded'"
                    }`,
                    position: "absolute",
                    top: `5%`,
                    left: `5%`,
                    padding: "1rem",
                    fontWeight: "600",
                    color: file ? theme.colors.teal : theme.colors.blue,
                    background: theme.colors.dark,
                    width: `auto`,
                    height: `35px`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
        classNames={{ root: classes.dropzoneRoot }}
        onDrop={(files) => {
          notifications.showNotification({
            color: "teal",
            title: "File accepted",
            message: "File Upload successful! Fill remaining fields",
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
        {(status, theme) => dropzoneChildren(status, theme, data, file)}
      </Dropzone>
      {FOR_STAX && (
        <Group>
          <form
            className={classes.form}
            onSubmit={form.onSubmit((values) => {
              handleSubmit(values);
            })}
          >
            <TextInput
              label="Enter your name"
              variant="filled"
              size="md"
              maxLength={200}
              className={classes.input}
              value={form.values.name}
              {...form.getInputProps("name")}
              required
            />
            {/* if link is for stax campus show Link input*/}
            {FOR_STAX_CAMPUS ? (
              <TextInput
                label="Enter link here"
                variant="filled"
                size="md"
                maxLength={300}
                className={classes.input}
                value={form.values.link}
                {...form.getInputProps("link")}
                required
              />
            ) : (
              <TextInput
                label="Enter full name of university"
                variant="filled"
                size="md"
                maxLength={300}
                className={classes.input}
                value={form.values.university}
                {...form.getInputProps("university")}
                required
              />
            )}

            <Group position="left" mt="md">
              <Button
                disabled={!isReady()}
                type="submit"
                size="md"
                color="blue"
              >
                Generate Banner
              </Button>
            </Group>
          </form>
        </Group>
      )}
      <Paper sx={{ margin: "2rem 0" }} shadow={"xs"} p="xs">
        <Text color="dark">
          Copy and Share this url to others, so they can create a customized dp
          using the banner above
        </Text>
        <Text
          className={classes.shareUrlWrapper}
          color={"dark"}
          weight={600}
          size="md"
        >
          <span>{shareUrl}</span>
        </Text>
      </Paper>
      <Group>
        {Boolean(imgUrl) && (
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
        )}
        {!FOR_STAX && (
          <Button
            color="indigo"
            variant="outline"
            size="md"
            component={Link}
            to="banner/create"
          >
            Create New Banner
          </Button>
        )}
      </Group>
    </Container>
  );
}

export const dropzoneChildren = (status, theme, data, file) => {
  return (
    <Group>
      <Button
        variant="subtle"
        color={file ? "teal" : "blue"}
        size="sm"
        leftIcon={<PlusSquare />}
      >
        {file ? "Reupload  Image" : "Upload Image"}
      </Button>
      <Text color={Boolean(file) ? "teal" : "blue"}>
        {" "}
        {Boolean(file)
          ? "Good Job! please fill the remaining inputs below or upload a different image max(6mb), - "
          : " max(6mb), your image will replace the avatar area."}{" "}
        {`${data.Width} by ${data.Height} works best`}
      </Text>
    </Group>
  );
};
