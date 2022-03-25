import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  Text,
  Container,
  TextInput,
  Textarea,
  RadioGroup,
  Radio,
  Button,
  Group,
  createStyles,
} from "@mantine/core";
import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useNotifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    marginBottom: "2rem",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    minHeight: "500px",
    height: "auto",
    "@media(max-width:920px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  dropzone: {
    width: "min(450px,100%)",
    height: "300px",
    marginBottom: "0.875rem",
  },
  form: {
    width: "auto",
    marginRight: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
    flexBasis: "40%",
    "@media(max-width:920px)": {
      width: "100%",
      marginRight: "0",
    },
  },
  input: {
    marginBottom: "1rem",
    width: "min(450px, 100%)",
  },
}));

export default function CreateDP() {
  const imgRef = useRef(null);
  const MAX_FILE_SIZE = 60000000;
  const [crop, setCrop] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [completedCrop, setCompletedCrop] = useState(false);
  const [shapeType, setShapeType] = useState("box");
  const { classes } = useStyles();
  const notifications = useNotifications();

  const getBannerData = () => {
    let data = new FormData();
    data.append("file_uploaded", imgSrc);
    data.append("Link", "queso");
    data.append("Height", "32.663316582914575");
    data.append("Width", "31.909547738693465");
    data.append("Position_x", "32.03517587939699");
    data.append("Position_y", "31.25785175879397");
    data.append("Border_radius", "");
    data.append("Name", "Test Image");
    data.append("Description", "just to test");
    data.append("user", "");
  };
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      link: "",
    },
  });

  const onFileDrop = (files) => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result.toString() || "");
      });
      reader.readAsDataURL(files[0]);
    }
  };

  const onImageLoad = (e) => {
    imgRef.current = e.currentTarget;
    // const { width, height } = e.currentTarget;
  };

  return (
    <Container className={classes.container}>
      {Boolean(!imgSrc) ? (
        <section style={{ marginTop: "2rem" }}>
          <Dropzone
            multiple={false}
            maxSize={MAX_FILE_SIZE}
            accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
            onDrop={(files) => onFileDrop(files)}
            onReject={(files) => {
              notifications.showNotification({
                color: "red",
                title: "Error",
                message: "file did not meet restrictions, Try again.",
              });
            }}
            className={classes.dropzone}
          >
            {(status) => dropzoneChildren(status)}
          </Dropzone>
          <Text color={"indigo"}>Note: max file size of image is 6mb</Text>
        </section>
      ) : (
        <section style={{ marginTop: "2rem", flexBasis: "60%" }}>
          <Text color={"indigo"}>Banner Image</Text>
          <RadioGroup
            value={shapeType}
            onChange={setShapeType}
            label={"Select crop shape"}
            size="md"
            color="teal"
            required
            sx={{ marginBottom: "2rem" }}
          >
            <Radio value="box" label={"Box shape"} />
            <Radio value="round" label={"Round shape"} />
          </RadioGroup>
          <ReactCrop
            crop={crop}
            disabled={completedCrop}
            circularCrop={shapeType === "round"}
            onChange={(_, percentCrop) => {
              setCrop(percentCrop);
            }}
            onComplete={() => {
              console.log(crop);
            }}
          >
            <img src={imgSrc} alt="Select an area" onLoad={onImageLoad} />
          </ReactCrop>
          <Group position="center" spacing={"xs"}>
            <Button
              variant="subtle"
              color="indigo"
              onClick={() => setCompletedCrop(!completedCrop)}
              sx={{ marginTop: "1rem" }}
            >
              {completedCrop ? "Re-Select" : "Done"}
            </Button>
            <Button
              variant="subtle"
              color="indigo"
              onClick={() => setImgSrc("")}
              sx={{ marginTop: "1rem" }}
            >
              Re Select Image
            </Button>
          </Group>
        </section>
      )}
      <form className={classes.form}>
        <TextInput
          label="Banner Title"
          variant="filled"
          size="md"
          className={classes.input}
          value={form.values.title}
          {...form.getInputProps("title")}
          required
        />
        <Textarea
          label="Banner Description"
          placeholder=""
          variant="filled"
          value={form.values.description}
          {...form.getInputProps("description")}
          autosize
          minRows={4}
          radius={"sm"}
          size={"md"}
          className={classes.input}
          required
        />
        <TextInput
          label="Banner Link"
          value={form.values.link}
          {...form.getInputProps("link")}
          description="this is the link you'll share to users,add no space or numbers"
          variant="filled"
          size="md"
          className={classes.input}
          required
        />
        <Button color="indigo" type="submit" sx={{ width: "min(450px, 100%)" }}>
          Next
        </Button>
      </form>
    </Container>
  );
}

export const dropzoneChildren = (status) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Text size="md">Drag your banner image here or click to select file</Text>
    </div>
  );
};
