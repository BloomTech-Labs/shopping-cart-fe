import React, { useState, useEffect } from 'react';
import trashIcon from '../../images/trash_icon.svg';

const AddVariants = ({ formData, setFormData, productData, setProductData }) => {
	//active = If a user has selected to start adding variants
	const [ active, setActive ] = useState(false);
	// formData = state used for variantOption & Variant price to be added to to #ProductData when function #submitHandler is used

	const [ errorState, setErrorState ] = useState();

	function changeHandler(e) {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	function variantNameHandler(e) {
		e.preventDefault();
		setProductData({ ...productData, [e.target.name]: e.target.value });
	}

	function submitHandler(e) {
		e.preventDefault();
		if (!productData.variantName) {
			return setErrorState('variantName');
		}

		if (!formData.option) {
			return setErrorState('variantOption');
		}

		if (!formData.price) {
			return setErrorState('variantPrice');
		}

		setErrorState('');

		setProductData({ ...productData, ['variantDetails']: [ ...productData.variantDetails, formData ] });
		setFormData({
			option: '',
			price: ''
		});
	}

	function removeVariant(arg) {
		const newState = productData.variantDetails.filter((cv) => {
			return cv.option !== arg;
		});
		return setProductData({ ...productData, ['variantDetails']: newState });
	}

	function clearVariants() {
		setProductData({ ...productData, ['variantDetails']: [], ['variantName']: '' });
		setFormData({
			option: '',
			price: ''
		});
	}

	return (
		<div className="masterContainer">
			<div className="createProductContainer">
				<div className="HeaderContainer">
					<div className="textContainer">
						<h3>Variants:</h3>
						<p>
							Product options a customer can choose from. <a>Learn More</a>
						</p>
					</div>
					<button
						onClick={() => {
							setActive(true);
						}}
						className={active ? 'disabled' : 'setActive'}
					>
						Create Variants
					</button>
				</div>

				{active ? (
					<div className="VariantFormContainer">
						<form onSubmit={submitHandler}>
							<div className="variantNameContainer">
								<div className="inputContainer">
									<label className={errorState === 'variantName' ? 'errorLabel' : ''}>
										Variant Name
									</label>
									{productData.variantDetails.length >= 1 ? (
										<div className="VariantNameContainer">
											<div className="createdVariantName">{productData.variantName}</div>{' '}
											<p
												className={
													productData.variantDetails.length >= 1 ? (
														'clearBTN'
													) : (
														'clearBTN clearDisabled '
													)
												}
												onClick={clearVariants}
											>
												Clear Varaints
											</p>
										</div>
									) : (
										<input
											type="text"
											name="variantName"
											placeholder="Variant Name Here"
											value={productData.variantName}
											onChange={variantNameHandler}
										/>
									)}
								</div>
							</div>
							<div className={errorState === 'variantName' ? 'error' : 'hideError'}>
								Add a variant name
							</div>
							<div className="addVariantContainer">
								<div className="inputContainer">
									<label
										className={errorState === 'variantOption' ? 'errorLabel' : ''}
										htmlFor="option"
									>
										Variant Option
									</label>
									<input
										type="text"
										name="option"
										placeholder="example: Large"
										value={formData.option}
										onChange={changeHandler}
									/>
									<div className={errorState === 'variantOption' ? 'error' : 'hideError'}>
										Add a variant name
									</div>
								</div>

								<div className="inputContainer">
									<label
										className={errorState === 'variantPrice' ? 'errorLabel' : ''}
										htmlFor="variantPrice"
									>
										Variant Price
									</label>
									<input
										type="number"
										name="price"
										placeholder="Example: 1.99"
										value={formData.price}
										onChange={changeHandler}
									/>
									<div className={errorState === 'variantPrice' ? 'error' : 'hideError'}>
										Add a variant name
									</div>
								</div>

								<div className="addBTNContainer">
									<button type="submit">Add Option</button>
								</div>
							</div>
						</form>
					</div>
				) : (
					''
				)}
			</div>
			{productData.variantDetails.length >= 1 ? (
				productData.variantDetails.map((cv) => {
					return <VaraintChild data={cv} removeVariant={removeVariant} key={Math.random() * Math.random()} />;
				})
			) : (
				''
			)}
		</div>
	);
};

export default AddVariants;

const VaraintChild = (props) => {
	return (
		<div className="cardContainer">
			<p>
				{props.data.option} | ${props.data.price}
			</p>
			<img
				className="trashcan"
				src={trashIcon}
				onClick={() => {
					props.removeVariant(props.data.option);
				}}
			/>
		</div>
	);
};
