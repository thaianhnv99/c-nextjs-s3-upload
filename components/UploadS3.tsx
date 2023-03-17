import { useState } from "react";

const UploadS3 = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false)

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;

    if(!file) {
      setUrl('');
      setLoading(false);
      return;
    };

    const filename = file.name;
    const fileType = file.type;
    setLoading(true);
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
      const s3FileUrl = `https://upload-file-s3-bucket.s3.ap-southeast-1.amazonaws.com/${filename}`;
      console.log(s3FileUrl);
      setUrl(s3FileUrl);
    } else {
      alert("Upload failed.");
    }

    setLoading(false)
  };

  return (
    <>
    <h1>Test</h1>
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={uploadPhoto}
      />
      {loading && 'loading...'}
      </div>
      {url && <img width={500} height={500} src={url} alt={""} />}
    </>
  );
};

export default UploadS3;
