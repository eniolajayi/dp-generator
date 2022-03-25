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
} from "@mantine/core";
import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useMediaQuery } from "@mantine/hooks";

export default function CreateDP() {
  const imgRef = useRef(null);
  const MAX_FILE_SIZE = 60000000;
  const [crop, setCrop] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [completedCrop, setCompletedCrop] = useState(false);
  const [shapeType, setShapeType] = useState("box");
  const matchesTablet = useMediaQuery("(max-width:920px)");

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
    <Container
      sx={{
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
      }}
    >
      {Boolean(!imgSrc) ? (
        <section style={{ marginTop: "2rem" }}>
          <Dropzone
            multiple={false}
            maxSize={MAX_FILE_SIZE}
            accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
            onDrop={(files) => onFileDrop(files)}
            onReject={(files) => console.log("file did not meet restrictions")}
            sx={{
              width: "min(450px,100%)",
              height: "300px",
              marginBottom: "0.875rem",
            }}
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
              sx={{
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {completedCrop ? "Re-Select" : "Done"}
            </Button>
            <Button
              variant="subtle"
              color="indigo"
              onClick={() => setImgSrc("")}
              sx={{
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Re Select Image
            </Button>
          </Group>
        </section>
      )}
      <form
        style={{
          width: matchesTablet ? "100%" : "auto",
          marginRight: matchesTablet ? "0" : "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          flexBasis: "40%",
        }}
      >
        <TextInput
          label="Banner Title"
          variant="filled"
          size="md"
          sx={{ marginBottom: "1rem", width: "min(450px, 100%)" }}
          required
        />
        <Textarea
          label="Banner Description"
          placeholder=""
          variant="filled"
          autosize
          minRows={4}
          radius={"sm"}
          size={"md"}
          sx={{
            marginBottom: "1rem",
            width: "min(450px, 100%)",
          }}
          required
        />
        <TextInput
          label="Banner Link"
          description="this is title of the link shared to users"
          variant="filled"
          size="md"
          sx={{ marginBottom: "1rem", width: "min(450px, 100%)" }}
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
