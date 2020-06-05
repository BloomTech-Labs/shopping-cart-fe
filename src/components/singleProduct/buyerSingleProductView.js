import React, { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import * as creators from "../../state/actionCreators"

function SingleProductView(props) {
  //productState is used only for the values that is submitted to the cart
  const [productState, setProductState] = useState([
    {
      name: "",
      price: null,
      productId: "",
      quantity: 1,
      images: [],
    },
  ])
  //Full Product is used to populate the interface
  const [fullProduct, setFullProduct] = useState([])
  const itemId = props.productId
  const dispatch = useDispatch()

  const cartContents = useSelector((state) => state.cart)

  function changeHandler(e) {
    e.preventDefault()
    setProductState({
      ...productState,
      [e.target.name]: parseInt(e.target.value),
    })
  }
  const addToCart = (arg) => {
	const productIdexists = cartContents.some(cart => { return cart.productId === arg.productId})
	if(!productIdexists) {
		dispatchItem(arg)
	} 
  }

  console.log("cartContents", cartContents)
  useEffect(() => {
    axios
      .get(
        `https://shopping-cart-be.herokuapp.com/api/store/products/${itemId}`
      )
      .then((res) => {
        setFullProduct(res.data)
        setProductState({
          name: res.data.name,
          price: res.data.price,
          productId: res.data._id,
          quantity: 1,
          images: [res.data.images],
        })
    
      })
      .catch((err) => {
        console.log(err)
      })
  }, [itemId])

  const dispatchItem = (item) => {
    if (item) {
      dispatch(creators.addToCart(item))
      console.log("🎩", item)
    }
  }

  return (
    <div className="singleProductContainer">
      <div className="photoSection">
        <div className="allPhotos">
          {fullProduct.images
            ? fullProduct.images.map((cv) => {
                return <img src={cv} />
              })
            : ""}
        </div>
      </div>
      <div className="productInfoContatiner">
        {/* <button onClick={logger}> Logger</button> */}
        <h2>{fullProduct.name}</h2>
        <h1> ${fullProduct.price}</h1>
        <div className="divider" />
        <h3 className="description"> Description</h3>
        <p>{fullProduct.description}</p>
        <div className="productOptions">
          <div className="quantity">
            <label htmlFor="productQuantity">Quantity</label>
            <select name="quantity" onChange={changeHandler}>
              <option disabled selected value>
                select an quantity
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          {/* If there are varaitns for the product add input else don't */}
          {/* Everything in the variants should be data grabbed from the redux store */}
          <div className="variant">
            <label htmlFor="">Chosen Name</label>
            <select name="">
              <option disabled selected value>
                select an option
              </option>
              <option value="var1">Var 1</option>
              <option value="var2">Var 2</option>
            </select>
          </div>
        </div>
		{
			
		}
        <button className="addToCart" onClick={() => addToCart(productState)}>
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default SingleProductView
