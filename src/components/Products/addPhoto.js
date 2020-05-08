import React, { useState, useEffect } from "react";
import axios from "axios";
import AxiosAuth from "../Auth/axiosWithAuth";

const AddPhoto = () => {
  const [imageList, setImageList] = useState();
  const [cloudUrl, setCloudUrl] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = e => {
    const files = e.target.files;
    setLoading(true);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ShoppingCart-Products");

    axios
      .post("https://api.cloudinary.com/v1_1/dnsl4nbz4/image/upload", data)
      .then(res => {
        setCloudUrl([...cloudUrl, res.data.secure_url]);
      });

    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={uploadImage} />
      {loading
        ? "Loading..."
        : cloudUrl.map(cv => {
            return <img src={cv} />;
          })}
    </div>
  );
};

export default AddPhoto;

// {imageList ? <img src={imageList} /> : <div> nope</div>}
//       <button
//         onClick={() => {
//           console.log(imageList);
//         }}
//       >
//         State
//       </button>
