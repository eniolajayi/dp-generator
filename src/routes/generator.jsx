import { useState } from "react";

export default function DPGenerator() {
  const [imgSrc, setImgSrc] = useState("");
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <h1>Generate DP</h1>
      {/* User uploads image */}
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {Boolean(imgSrc) && <img src={imgSrc} alt="Select an area" />}
      {/* Allow then select a part */}
      {/* create data structure from selected part */}
    </>
  );
}
