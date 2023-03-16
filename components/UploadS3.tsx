const UploadS3 = () => {
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    const filename = file.name;
    const fileType = file.type;
    const res = await fetch(
      `/api/upload?file=${filename}&fileType=${fileType}`
    );
    const { url } = await res.json();
    const upload = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": fileType },
    });
    if (upload.ok) {
      alert("Uploaded successfully!");
    } else {
      alert("Upload failed.");
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={uploadPhoto}
      />
    </>
  );
};

export default UploadS3;
