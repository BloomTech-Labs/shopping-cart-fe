import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Carousel, Button, Icon, Typography, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as creators from '../../state/actionCreators';

const { Paragraph } = Typography;
function SingleProductView(props) {
	const [ productState, setProductState ] = useState([]);
	const itemId = props.productId;
	const dispatch = useDispatch();
	const cartContents = useSelector((state) => state.cart);
	const isLoading = useSelector((state) => state.user.isLoading);
	useEffect(
		() => {
			dispatch(creators.setLoading(true));
			axios
				.get(`https://shopping-cart-be.herokuapp.com/api/store/products/${itemId}`)
				.then((res) => {
					setProductState(res.data);
					dispatch(creators.setLoading(false));
				})
				.catch((err) => {
					dispatch(creators.setLoading(false));
					console.log(err);
				});
		},
		[ itemId, dispatch ]
	);

	console.log('productState', productState);

	const dispatchItem = (item) => {
		dispatch(creators.addToCart(item));
	};
	const removeItem = (item) => {
		dispatch(creators.subtractFromCart(item));
	};
	const btnChange = (item) => {
		const itemObj = cartContents.find(({ productId }) => productId === item._id);
		return itemObj;
	};
	return (
		<div className="singleProductContainer">
			<div className="photoSection">
				<div className="allPhotos">
					{/* Map over all images here */}
					<img src={productState.images} />
					<img src={productState.images} />
					<img src={productState.images} />
				</div>
			</div>
			<div className="productInfoContatiner">
				<h2>This is my title</h2>
				<h1> $99.99</h1>
				<div className="divider" />
				<h3 className="description"> Description</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus, nisl quis elementum
					sodales, ligula ipsum porta metus, in vestibulum erat dolor id felis. Pellentesque consequat nulla
					ut porttitor ultrices. Aenean interdum et dolor sit amet iaculis. Pellentesque ac nisi sed nunc
					convallis finibus.
				</p>
				<div className="productOptions">
					<div className="quantity">
						<label htmlFor="quantity">Quantity</label>
						<input name="quantity" type="number" />
					</div>
					{/* If there are varaitns for the product add input else don't */}
					{/* Everything in the variants should be data grabbed from the redux store */}
					<div className="variant">
						<label htmlFor="">Chosen Name</label>
						<select name="">
							<option disabled selected value>
								-- select an option --
							</option>
							<option value="var1">Var 1</option>
							<option value="var2">Var 2</option>
						</select>
					</div>
				</div>
				<button className="addToCart"> Add To Cart </button>
			</div>
		</div>
	);
}

export default SingleProductView;
