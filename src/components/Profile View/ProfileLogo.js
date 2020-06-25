import React, { useState } from "react"
import AxiosAuth from "../Auth/axiosWithAuth"
import Axios from "axios"

const ProfileLogo = ({ store }) => {
  const [logo, setLogo] = useState({
    logo: store.logo,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    AxiosAuth()
      .put(`https://shopping-cart-be.herokuapp.com/api/store/`, logo)
      .then((res) => console.log("ProfileLogoSubmit", res.data, window.location.reload()))
      .catch((err) => console.log(err.message))
  }

  const uploadImage = (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "shopping-cart-logo")
    Axios.post("https://api.cloudinary.com/v1_1/dnsl4nbz4/image/upload", data)
      .then((res) => {
        setLogo({
          logo: res.data.secure_url,
        })
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <div className="logoContainer">
      <h3>Logo</h3>
      <img src={logo.logo} alt="logo" />
      <input type="file" onChange={uploadImage} />
      <button onClick={handleSubmit}>Change Logo</button>
    </div>
  )
}

export default ProfileLogo
