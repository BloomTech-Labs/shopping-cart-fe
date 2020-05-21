import React, { useState, useEffect } from 'react';
import trashIcon from '../../images/trash_icon.svg';

const AddVariants = ({ formData, setFormData, productData, setProductData }) => {
	const [ stopFirstLoad, setStopFirstLoad ] = useState(false);
	//active = If a user has selected to start adding variants
	const [ active, setActive ] = useState(false);
	// formData = Holds the input field data until it is submited

	const [ errorState, setErrorState ] = useState();

	function changeHandler(e) {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	function submitHandler(e) {
		e.preventDefault();
		setStopFirstLoad(true);
		if (!formData.variantName) {
			return setErrorState('variantName');
		}
		if (!formData.variantOption) {
			return setErrorState('option');
		}
		if (!formData.variantPrice) {
			return setErrorState('variantPrice');
		}

		setProductData({ ...productData, ['variants']: [ ...productData.variants, formData ] });
		setFormData({
			variantName: formData.variantName,
			variantOption: '',
			variantPrice: ''
		});
		setErrorState('');
		setStopFirstLoad(false);
	}

	function removeVariant(arg) {
		console.log(arg);
		const newState = productData.variants.filter((cv) => {
			return cv.variantOption !== arg;
		});
		return setProductData({ ...productData, ['variants']: newState });
	}

	function clearVariants() {
		setProductData({ ...productData, ['variants']: [] });
		setFormData({
			variantName: '',
			variantOption: '',
			variantPrice: ''
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
									<input
										className={productData.variants.length >= 1 ? 'inputDisabled' : ''}
										type="text"
										name="variantName"
										placeholder="Variant Name Here"
										value={formData.variantName}
										onChange={changeHandler}
										disabled={productData.variants.length >= 1 ? true : false}
									/>
								</div>

								<p
									className={
										productData.variants.length >= 1 ? 'clearBTN' : 'clearBTN clearDisabled '
									}
									onClick={clearVariants}
								>
									Clear Varaints
								</p>
							</div>
							<div className={errorState === 'variantName' ? 'error' : 'hideError'}>
								Add a variant name
							</div>
							<div className="addVariantContainer">
								<div className="inputContainer">
									<label className={errorState === 'option' ? 'errorLabel' : ''} htmlFor="option">
										Variant Option
									</label>
									<input
										type="text"
										name="variantOption"
										placeholder="example: Large"
										value={formData.variantOption}
										onChange={changeHandler}
									/>
									<div className={errorState === 'option' ? 'error' : 'hideError'}>
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
										name="variantPrice"
										placeholder="Example: 1.99"
										value={formData.variantPrice}
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
			{productData.variants.length >= 1 ? (
				productData.variants.map((cv) => {
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
				{props.data.variantName}: {props.data.variantOption} | ${props.data.variantPrice}
			</p>
			<img
				className="trashcan"
				src={trashIcon}
				onClick={() => {
					props.removeVariant(props.data.variantOption);
				}}
			/>
		</div>
	);
};
