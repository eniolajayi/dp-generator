import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function DPGenerator() {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    imgRef.current = e.currentTarget;
    const { width, height } = e.currentTarget;
  };

  return (
    <>
      <h1>Generate DP</h1>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {Boolean(imgSrc) && (
        <ReactCrop
          crop={crop}
          circularCrop={true}
          onChange={(_, percentCrop) => {
            setCrop(percentCrop);
          }}
          onComplete={() => {
            console.log(crop);
          }}
        >
          <img src={imgSrc} alt="Select an area" onLoad={onImageLoad} />
        </ReactCrop>
      )}
      {/* Allow then select a part */}
      {/* create data structure from selected part */}
    </>
  );
}
