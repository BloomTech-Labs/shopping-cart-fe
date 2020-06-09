import React, { useState } from 'react';
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
        props.logoUpload(res.data.secure_url);
        props.setUserInfo({ ...props.userInfo, logo: res.data.secure_url });
      });
    setLoading(false);
  };
  return (
    <div>
      <h3>Add your logo!</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img className='logoPic' alt='logo' src={cloudUrl} />
      )}
      <input id='uploadButton' type='file' onChange={uploadImage} />
      <label htmlFor='uploadButton' className='fakeUploadButton'>
        Add Photo
      </label>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logo: state.logo,
  };
};

export default connect(mapStateToProps, { logoUpload })(LogoUpdate);
