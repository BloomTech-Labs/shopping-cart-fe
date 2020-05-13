import React from "react"
import { Card, Tag, Button } from "antd"

function UserInfo() {
  return (
    <div style = {{marginRight: 20}}>
      <Card style={{ width: 400, marginBottom : '10px', }}>
        <div style={{display: "flex", flexDirection: "column", marginBottom:"10px" }}>
          <div style = {{padding: "0px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom:"0.5px solid grey" }} >
            <div style ={{}}>
              <p style = {{ fontSize :"18px", fontWeight: "bold", marginBottom: "0px" , color: 'black' }}>Andy Doe</p>
              <p style = {{ color: "grey", marginBottom: "0px", fontWeight: "bold"}}>409-790-6464</p>
            </div>
            <div>
              <p style = {{ fontWeight: "bold", fontSize: '14px'}} >83923</p>
              <Tag color="#ffbf00" style = {{color: "black", fontSize: 14, fontWeight: "bold", marginBottom: "1em"}}>Not Ready</Tag>
            </div>
          </div>
          <div style = {{padding: "0px", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop:"15px"}}>
            <div >
              <p style ={{marginBottom: "0px", fontWeight: "bold", fontSize: '16px'}}>Order Made</p>
              <p style = {{ fontSize :"14px", fontWeight: "bold", marginBottom: "0px", color: 'black' }}>Apr 1, 3:14pm</p>
            </div>
           <div>
            <p style = {{ marginBottom: "0px", fontWeight: "bold", fontSize: '16px'}}>Order Completed</p>
            <p style = {{ fontSize: "14px", marginBottom: "0px", fontWeight: "bold"}}>-</p>
           </div>
          </div>
        </div>
      </Card >
        <Button style ={{marginRight: 20, color:'white', background:"green", fontWeight:"bold", height: 40}}>Order Ready</Button>
        <Button style = {{ color: "black", background:"Grey", fontWeight:"bold", height: 40}} >Cancel Order</Button>
    </div>
  )
}

export default UserInfo
