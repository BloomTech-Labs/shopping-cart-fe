import React from "react";
import "./Dashboard.css";
import { Icon } from "antd";

const Pane2 = ({ name, description, price ,checkoutDate}) => {
  console.log(name, description, price, checkoutDate);
  return (
    <div className="Card2">
      <div className="PaneFlex">
        <Icon type="check-circle" style={{ color: "#BFD7EA" }} />
        <div className="StoreTitle">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <div className="StorePrice">
          <h2>{price}</h2>
          <p>Dec. 14</p>
        </div>
      </div>
    </div>
  );
};

export default Pane2;
