import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logoUpload } from '../state/actionCreators';

const LogoUpdate = (props) => {
  const [cloudUrl, setCloudUrl] = useState(
    'https://i.gyazo.com/c07509b1684992e37e46b355e942dadf.png'
  );

  const [loading, setLoading] = useState(false);
  const uploadImage = (e) => {
    const files = e.target.files;
    setLoading(true);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'shopping-cart-logo');
    axios
      .post('https://api.cloudinary.com/v1_1/dnsl4nbz4/image/upload', data)
      .then((res) => {
        setCloudUrl(res.data.secure_url);
      });
    setLoading(false);
  };
  console.log('logoupdate props', props);
  return (
    <div>
      <input type='file' onChange={uploadImage} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img style={imageStyle} alt='logo' src={cloudUrl} />
      )}
      <button
        onClick={() => {
          props.logoUpload(cloudUrl);
        }}>
        push please
      </button>
    </div>
  );
};

// plans for tomorrow
// get dispatch function working
// style up both pages (welcomeScreen / brandUpdate )

const mapStateToProps = (state) => {
  return {
    logo: state.logo,
  };
};

export default connect(mapStateToProps, { logoUpload })(LogoUpdate);

const imageStyle = {
  height: '100px',
};
