import React, { useState, useEffect } from "react"
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Popup,
} from "react-map-gl"
import Geocode from "react-geocode"
import location from "../../images/location.svg"

const googleApiToken = "AIzaSyCGitfTdb5_Ws7YW5bw96WUk0MjlDknV7E"
const mapboxApiToken =
  "pk.eyJ1IjoiYXJpdWthMTEiLCJhIjoiY2tjYjU4djRmMHE4azM0cWtsOWY0OXR4MSJ9.nXeE9BwATwbesLeJJxJTAw"

const Modal = ({ show, user }) => {
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    Geocode.setApiKey(googleApiToken)
    Geocode.fromAddress(user.address + user.city)
      .then((response) => {
        window.localStorage.setItem("response", JSON.stringify(response))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [user])

  const coordinate = JSON.parse(localStorage.getItem("response")).results[0]
    .geometry.location

  const [viewPort, setViewPort] = useState({
    latitude: coordinate.lat,
    longitude: coordinate.lng,
    width: "30vw",
    height: "20vh",
    zoom: 14,
  })

  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <h3>
          {user.businessName} | {user.address}, {user.city} {user.state},{" "}
          {user.zipcode}
        </h3>
        <p>Hours: {user.hours}</p>
        <p>Hours: 9:00am- 8:00pm || Monday-Friday</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${coordinate.lat},${coordinate.lng}`}
        >
          Get Direction
        </a>
      </div>
      <div className="modal-body">
        <div className="mapContainer">
          <ReactMapGL
            {...viewPort}
            mapboxApiAccessToken={mapboxApiToken}
            // mapStyle = "mapbox://styles/ariuka11/ckcgwlimk0ldc1iob71hc4s2h"
            mapStyle="mapbox://styles/ariuka11/ckcgwq30x0a8k1ip68ajqruoo"
            // mapStyle = "mapbox://styles/ariuka11/ckcb5g7ne3rbq1inu8kc7dqye"
            onViewportChange={(viewPort) => {
              setViewPort(viewPort)
            }}
          >
            <Marker
              latitude={coordinate.lat}
              longitude={coordinate.lng}
              offsetLeft={-20}
              className="marker"
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setSelected(true)
                }}
              >
                <img src={location} alt="marker" />
              </button>
            </Marker>
            {selected && (
              <Popup
                latitude={coordinate.lat}
                longitude={coordinate.lng}
                onClose={() => {
                  setSelected(false)
                }}
              >
                <h3>{user.address},</h3>
                <p style={{ fontSize: "1.5rem" }}>
                  {user.city} {user.state}, {user.zipcode}
                </p>
              </Popup>
            )}
            <div style={{ position: "absolute", right: 0 }}>
              <NavigationControl />
            </div>
            <div style={{ position: "absolute", left: 0 }}>
              <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
              />
            </div>
          </ReactMapGL>
        </div>
      </div>
    </div>
  )
}

export default Modal
