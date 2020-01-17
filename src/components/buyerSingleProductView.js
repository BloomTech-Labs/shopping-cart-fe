import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Button, Icon } from "antd";
import "../less/index.less";
function SingleProductView(props) {
  const [productState, setProductState] = useState([]);
  const [count, setCount] = useState(0);
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
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <div className="subHeader">
        <h1>placeholder</h1>
      </div>
      <div className="kol">
        <Carousel className="img">
          {productState.images &&
            productState.images.length &&
            productState.images.map(item => (
              <img style={{}} src={item} alt="product" />
            ))}
        </Carousel>
        <div className="subKol">
          <div className="subNameDesc">
            <h1>{productState.name}</h1>
            <p>{productState.description}</p>
          </div>
          <div className="subIncDec">
            <h1>How many items?</h1>
            <div className="subIncDecFlex">
              <Button onClick={increment}>
                <Icon type="plus" />
              </Button>
              <Button id="subIncDecCount">
               {count}
              </Button>

              <Button onClick={decrement}>
                <Icon type="minus" />
              </Button>
            </div>
          </div>
          <div className="subButton">
            <Button>Add to Cart</Button>
          </div>

          <Icon id="gold" type="shopping-cart" />
        </div>
      </div>
      <div className="subFooter">
        <h1>Go to your cart</h1>
      </div>
    </div>
  );
}

export default SingleProductView;
