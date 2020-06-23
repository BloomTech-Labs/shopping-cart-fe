import React, { useState, useEffect } from "react"
import AxiosAuth from "../components/Auth/axiosWithAuth"
import Navbar from "./Navbar"
import Axios from "axios"

const ProfileView = (props) => {
  const [store, setStore] = useState()
  const [input, setInput] = useState({
    businessName: "",
  })

  useEffect(() => {
    AxiosAuth()
      .get("https://shopping-cart-be.herokuapp.com/api/store/")
      .then((res) => {
        setStore(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props])
  // console.log("store", store)
  const handleSubmit = (e) => {
    e.preventDefault()
    AxiosAuth()
      .put(`https://shopping-cart-be.herokuapp.com/api/store/`, input)
      .then((res) => console.log("RESS", res.data))
      .catch((err) => console.log(err.response.data))
  }

  const handleChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    })
  }

  console.log(input)
  return (
    <div>
      {store && (
        <div>
          <Navbar />
          <h1>Profile</h1>
          <section>
            <h3>Logo</h3>
            <img src={store.logo} alt="logo" />
            <h3>Brand Color</h3>
          </section>
          <section>
            <form className="profileForm" onSubmit={handleSubmit}>
              <label>Business Name</label>
              <input
                value={input.businessName}
                name='businessName'
                onChange={handleChange}
                placeholder={store.businessName}
              />
              <label>Owner Name</label>
              <input value={store.ownerName} />
              <label>Address</label>
              <input value={store.address} />
              <label>City</label>
              <input value={store.city} />
              <label>State</label>
              <input value={store.state} />
              <label>Zipcode</label>
              <input value={store.zipcode} />
              <label>Working Hours</label>
              <input value={store.hours} />
              <label>Curbside Pick up Hours</label>
              <input value={store.curbHours} />
              <button>Update Profile</button>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default ProfileView
