import React, { useState, useEffect } from "react"
import AxiosAuth from "../components/Auth/axiosWithAuth"
import Navbar from "./Navbar"

const ProfileView = (props) => {
  const [store, setStore] = useState()

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
  console.log("store", store)

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
          <div>
            <h3>Basic Details</h3>
            <div>
              <div>
                <h3>Business Name</h3>
                <p>{store.businessName}</p>
                <h3>Owner Name</h3>
                <p>{store.ownerName}</p>
                <h3>Building / Unit / Suite</h3>
                <p>{store.secondAddress}</p>
                <h3>State</h3>
                <p>{store.state}</p>
              </div>
              <div>
                <h3>Phone Number</h3>
                <p>{store.phone}</p>
                <h3>Address</h3>
                <p>{store.address}</p>
                <h3>City</h3>
                <p>{store.city}</p>
                <h3>Zip Code</h3>
                <p>{store.zipcode}</p>
              </div>
            </div>
            <div>
              <h3>Hours</h3>
              <p>{store.hours}</p>
              <h3>Curbside Hours</h3>
              <p>{store.curbHours}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileView
