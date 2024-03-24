const uploadImageToCloudinary = async file => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", "doctor");
  uploadData.append("cloud_name", "dwczgb2r5");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dwczgb2r5/image/upload",
    {
      method: "post",
      body: uploadData,
    }
  );

  const data = await res.json();
  return data;
};

export default uploadImageToCloudinary;
