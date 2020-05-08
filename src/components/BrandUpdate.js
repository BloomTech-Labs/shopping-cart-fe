import React, { useState, useEffect } from "react";
import axios from "axios";

const BrandUpdate = () => {
  const [cloudUrl, setCloudUrl] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = e => {
    const files = e.target.files;
    setLoading(true);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "shopping-cart-logo");
    axios
      .post("https://api.cloudinary.com/v1_1/dnsl4nbz4/image/upload", data)
      .then(res => {
        setCloudUrl(res.data.secure_url);
        console.log(res.data);
      });
    setLoading(false);
  };
  return (
    <div>
      <h1>Did this change?</h1>
      <input type="file" onChange={uploadImage} />
      {loading ? <p>Loading...</p> : <img src={cloudUrl} />}
    </div>
  );
};
export default BrandUpdate;
