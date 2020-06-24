import React, { useState } from "react"
import AxiosAuth from "../Auth/axiosWithAuth"

const ProfileForm = ({ store }) => {
  const [input, setInput] = useState({
    businessName: "",
    ownerName: "",
    address: "",
    secondAddress: "",
    city: "",
    state: "",
    zipcode: "",
    hours: "",
    curbHours: "",
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
                placeholder={store.businessName}
              />
              <label>Owner Name</label>
              <input
                value={input.ownerName}
                name="ownerName"
                onChange={handleChange}
                placeholder={store.ownerName}
              />
              <label>Address</label>
              <input
                value={input.address}
                name="address"
                onChange={handleChange}
                placeholder={store.address}
              />
            </section>
            <section className="secondSection">
              <label>City</label>
              <input
                value={input.city}
                name="city"
                onChange={handleChange}
                placeholder={store.city}
              />
              <label>State</label>
              <input
                value={input.state}
                name="state"
                onChange={handleChange}
                placeholder={store.state}
              />
              <label>Zipcode</label>
              <input
                value={input.zipcode}
                name="zipcode"
                onChange={handleChange}
                placeholder={store.zipcode}
              />
            </section>
          </main>
          <section className = "thirdSection">
          <label>Working Hours</label>
          <input
            value={input.hours}
            name="hours"
            onChange={handleChange}
            placeholder={store.hours}
          />
          <label>Curbside Pick up Hours</label>
          <input
            value={input.curbHours}
            name="curbHours"
            onChange={handleChange}
            placeholder={store.curbHours}
          />
          </section>
          <button>Update Profile</button>
        </form>
      )}
    </div>
  )
}

export default ProfileForm
