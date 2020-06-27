import React, { useState } from "react"
import AxiosAuth from "../Auth/axiosWithAuth"

const ProfileForm = ({ store }) => {
  const [input, setInput] = useState({
    businessName: store.businessName,
    ownerName: store.ownerName,
    address: store.address,
    secondAddress: store.secondAddress  ,
    city: store.city,
    state: store.state,
    zipcode: store.zipcode,
    hours: store.hours,
    curbHours: store.curbHours
  })

  const handleChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    AxiosAuth()
      .put(`https://shopping-cart-be.herokuapp.com/api/store/`, input)
      .then((res) => console.log("ProfileFormSubmit", res.data))
      .catch((err) => console.log(err.response.data))
  }
  return (
    <div className="formContainer">
      <h3>Basic Details:</h3>
      {store && (
        <form className="profileForm" onSubmit={handleSubmit}>
          <main>
            <section className="firstSection">
              <label>Business Name</label>
              <input
                value={input.businessName}
                name="businessName"
                onChange={handleChange}
             
              />
              <label>Owner Name</label>
              <input
                value={input.ownerName}
                name="ownerName"
                onChange={handleChange}
        
              />
              <label>Address</label>
              <input
                value={input.address}
                name="address"
                onChange={handleChange}
        
              />
            </section>
            <section className="secondSection">
              <label>City</label>
              <input
                value={input.city}
                name="city"
                onChange={handleChange}
   
              />
              <label>State</label>
              <input
                value={input.state}
                name="state"
                onChange={handleChange}
           
              />
              <label>Zipcode</label>
              <input
                value={input.zipcode}
                name="zipcode"
                onChange={handleChange}
        
              />
            </section>
          </main>
          <section className = "thirdSection">
          <label>Working Hours</label>
          <input
            value={input.hours}
            name="hours"
            onChange={handleChange}

          />
          <label>Curbside Pick up Hours</label>
          <input
            value={input.curbHours}
            name="curbHours"
            onChange={handleChange}

          />
          </section>
          <button>Update Profile</button>
        </form>
      )}
    </div>
  )
}

export default ProfileForm
