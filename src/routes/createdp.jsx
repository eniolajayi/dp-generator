import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  Text,
  Container,
  TextInput,
  Textarea,
  RadioGroup,
  Radio,
  Button,
} from "@mantine/core";
import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useMediaQuery } from "@mantine/hooks";

export default function CreateDP() {
  const imgRef = useRef(null);
  const MAX_FILE_SIZE = 60000000;
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState("");
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
        <section style={{ marginTop: "2rem" }}>
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
        </section>
      )}
      <form
        style={{
          width: matchesTablet ? "100%" : "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          flexBasis: "50%",
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
