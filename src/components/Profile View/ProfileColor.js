import React, { useState } from "react"
import AxiosAuth from "../Auth/axiosWithAuth"
import { TwitterPicker } from "react-color"

const ProfileColor = () => {
  const [color, setColor] = useState({
    color: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    AxiosAuth()
      .put(`https://shopping-cart-be.herokuapp.com/api/store/`, color)
      .then((res) => console.log("ProfileColorSubmit", res.data))
      .catch((err) => console.log(err.message))
  }

  return (
    <div className="colorContainer">
      <h3>Brand Color</h3>
      <TwitterPicker
        className="colorPicker"
        color={color.color}
        onChange={(color) => {
          setColor({
            color: color.hex,
          })
        }}
      />
      <button onClick={handleSubmit}>Change Color</button>
    </div>
  )
}

export default ProfileColor
