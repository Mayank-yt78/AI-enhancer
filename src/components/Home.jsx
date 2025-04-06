import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";
import { enhancedImageApi } from "../utils/EnhancedImageApi";

function Home() {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const UploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);
    // calling api to enhanced image

    try {
      const enhancedURL = await enhancedImageApi(file);
      setEnhancedImage(enhancedURL);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error while enhancing the image. please try again later");
    }
  };
  // console.log(enhancedImage.image);

  return (
    <>
      <ImageUploader uploadImageHandler={UploadImageHandler} />
      <ImagePreview
        loading={loading}
        upload={uploadImage}
        enhanced={enhancedImage?.image}
      />
    </>
  );
}

export default Home;
