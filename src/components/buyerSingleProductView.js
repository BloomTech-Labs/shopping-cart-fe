import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Button, Icon, Typography } from "antd";
import "../less/index.less";
import CartHeader from "./elements/cartHeader";
import { useDispatch } from "react-redux";
import * as creators from "../state/actionCreators";
const { Paragraph } = Typography;
function SingleProductView(props) {
  const [productState, setProductState] = useState([]);
  const [count, setCount] = useState(1);
  const itemId = props.match.params.id;
  useEffect(() => {
    axios
      .get(
        `https://shopping-cart-eu3.herokuapp.com/api/store/products/${itemId}`
      )
      .then(res => {
        setProductState(res.data);
      })
      .catch(err => console.log(err));
  }, [itemId]);

  function increment() {
    setCount(prevState => prevState + 1);
  }

  function decrement() {
    setCount(prevState => prevState - 1);
  }
  const dispatch = useDispatch();
  function addItem() {
    let myArr = [];
    for (let i = 0; i < count; i++) {
      myArr.push(productState);
      dispatch(creators.addSingleProductToCart(myArr));
    }
  }
  return (
    <div>
      <div>
        <CartHeader />
      </div>
      <div className="kol">
        <Carousel className="img">
          {productState.images &&
            productState.images.length &&
            productState.images.map((item, index) => (
              <div key={index}>
                <img
                  style={{ width: "100%", height: "32rem", margin: "0" }}
                  src={item}
                  alt="product"
                />
              </div>
            ))}
        </Carousel>
        <div className="subKol">
          <div className="subNameDesc">
            <h1>{productState.name}</h1>
            <div>
              <Paragraph ellipsis={{ rows: 3, expandable: true }}>
                {productState.description}
              </Paragraph>
            </div>
          </div>
          <div className="subIncDec">
            <h1>How many items?</h1>
            <div className="subIncDecFlex">
              <div className="subOnClick" onClick={increment}>
                <Icon
                  style={{
                    fontSize: "1.6rem",
                    marginTop: "1.1rem"
                  }}
                  type="plus"
                />
              </div>
              <div id="subIncDecCount">{count}</div>

              <div className="subOnClick" onClick={decrement}>
                <Icon
                  style={{
                    fontSize: "1.6rem",
                    marginTop: "1.1rem"
                  }}
                  type="minus"
                />
              </div>
            </div>
          </div>
          <div className="subButton">
            <Button onClick={addItem}>Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className="subFooter">
        <h1>Go to your cart</h1>
        <Icon
          style={{
            fontSize: "2.5rem",
            color: "#08c",
            marginTop: "0.9rem",
            marginLeft: "0.4rem"
          }}
          type="shopping-cart"
        />
      </div>
    </div>
  );
}

export default SingleProductView;
