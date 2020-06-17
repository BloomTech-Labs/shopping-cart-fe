import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as creators from '../../state/actionCreators';
import Navbar from "../Navbar"

const Inventory = () => {
	const inventory = useSelector((state) => state.store);

	const dispatch = useDispatch();
	useEffect(
		() => {
			dispatch(creators.getCurrentUser());
		},
		[ dispatch ]
	);

	return (
    <>
    <Navbar />
		<div className="inventoryMainContainer">
			<h1> Inventory </h1>
			{inventory.products.length > 1 ? (
				inventory.products.map((cv) => {
					return (
						<div className="inventoryCards" key={cv._id}>
							<div className="productContainer">
								<img src={cv.images} />
								<div className="productInfo">
									<h2> {cv.productName}</h2>
									<h4>
										{cv.category} <span> / </span> {`Varients: ${cv.variantDetails.length}`}
									</h4>
								</div>
							</div>
							<NavLink to={`/inventory/${cv._id}`}> Edit </NavLink>
						</div>
					);
				})
			) : (
				''
			)}
		</div>
    </>
	);
};

export default Inventory;
