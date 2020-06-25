import React, { useState, useEffect } from "react"
import ProfileForm from "./ProfileForm"
import ProfileLogo from "./ProfileLogo"
import ProfileColor from "./ProfileColor"
import Navbar from "../Navbar"
import AxiosAuth from "../Auth/axiosWithAuth"

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


  return (
    <div className = "profileViewContainer">
      <Navbar />
      <h1>Profile</h1>
      {store && (
        <div className="profileViewWrapper">
          <div className = "firstWrapper">
            <ProfileLogo store={store} />
            <ProfileColor store={store} />
          </div>
          <ProfileForm store={store} />
        </div>
      )}
    </div>
  )
}

export default ProfileView
