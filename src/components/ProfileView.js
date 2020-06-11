import React, { useState, useEffect } from 'react';
import AxiosAuth from '../components/Auth/axiosWithAuth';
import Navbar from './Navbar'
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

  useEffect(() => {
    AxiosAuth()
      .get('https://shopping-cart-be.herokuapp.com/api/store/')
      .then((res) => {
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
      <Navbar/>
      <h1>Profile</h1>
      <div
        style={{
          border: '2px solid',
          borderColor: color,
        }}
        className='profileViewWrapper'>
        <section className='logoColor'>
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

        <div className='profileView'>
          <h3 className='labels mainLabel'>Basic Details</h3>

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

            <div className='profileViewRight'>
              <h3 className='labels'>Phone Number</h3>
              <p className='profileInfo'>{phone}</p>
              <h3 className='labels'>Address</h3>
              <p className='profileInfo'>{address}</p>
              <h3 className='labels'>City</h3>
              <p className='profileInfo'>{city}</p>

              <h3 className='labels'>Zip Code</h3>
              <p className='profileInfo'>{zipcode}</p>
            </div>
          </div>

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
