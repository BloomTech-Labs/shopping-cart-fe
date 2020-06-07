import React, { useState, useEffect } from 'react';
import AxiosAuth from '../components/Auth/axiosWithAuth';
const ProfileView = () => {
  const [logo, setLogo] = useState();
  const [address, setAddress] = useState();
  const [secondAddress, setSecondAddress] = useState();
  const [businessName, setBusinessName] = useState();
  const [city, setCity] = useState();
  const [color, setColor] = useState();
  const [curbHours, setCurbHours] = useState();
  const [hours, setHours] = useState();
  const [ownerName, setOwnerName] = useState();
  const [phone, setPhone] = useState();
  const [state, setState] = useState();
  const [zipcode, setZipcode] = useState();
  // route is profileview

  useEffect(() => {
    AxiosAuth()
      .get('https://pure-retail-bg-routes-t3ulmxmy.herokuapp.com/api/store/')
      .then((res) => {
        console.log('res.data', res.data);
        setLogo(res.data.logo);
        setAddress(res.data.address);
        setZipcode(res.data.zipcode);
        setSecondAddress(res.data.secondAddress);
        setBusinessName(res.data.businessName);
        setCity(res.data.city);
        setColor(res.data.color);
        setCurbHours(res.data.curbHours);
        setHours(res.data.hours);
        setOwnerName(res.data.ownerName);
        setPhone(res.data.phone);
        setState(res.data.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      {/* Div to hold all info */}
      <div
        style={{
          border: '2px solid',
          borderColor: color,
        }}
        className='profileViewWrapper'>
        {/* Div to hold logo / color */}
        <section className='logoColor'>
          {/* image */}
          <h3 className='labels logoColorlabels'>Logo</h3>
          <img className='profileViewLogo' src={logo} alt='logo' />
          <h3 className='labels logoColorlabels'>Brand Color</h3>
          <div
            className='profileViewColor'
            style={{
              height: '100px',
              width: '200px',
              backgroundColor: color,
            }}></div>
        </section>
        {/* Div that holds left/right */}
        <div className='profileView'>
          <h3 className='labels mainLabel'>Basic Details</h3>
          {/* Div to hold leftside */}
          <div className='profileLeftRight'>
            <div className='profileViewLeft'>
              <h3 className='labels'>Business Name</h3>
              <p className='profileInfo'>{businessName}</p>
              <h3 className='labels'>Owner Name</h3>
              <p className='profileInfo'>{ownerName}</p>
              <h3 className='labels'>Building / Unit / Suite</h3>
              <p className='profileInfo'>{secondAddress}</p>
              <h3 className='labels'>State</h3>
              <p className='profileInfo'>{state}</p>
            </div>
            {/* Div to hold right side */}
            <div className='profileViewRight'>
              <h3 className='labels'>Phone Number</h3>
              <p className='profileInfo'>{phone}</p>
              <h3 className='labels'>Address</h3>
              <p className='profileInfo'>{address}</p>
              <h3 className='labels'>City</h3>
              <p className='profileInfo'>{city}</p>
              {/* needs to pull in data :( */}
              <h3 className='labels'>Zip Code</h3>
              <p className='profileInfo'>44444</p>
            </div>
          </div>
          {/* Div to hold bottom */}
          <div className='profileViewHours'>
            <h3 className='labels'>Hours</h3>
            <p className='profileInfo'>{hours}</p>
            <h3 className='labels'>Curbside Hours</h3>
            <p className='profileInfo'>{curbHours}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
