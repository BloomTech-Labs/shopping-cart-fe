import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AxiosAuth from '../Auth/axiosWithAuth';
import trashIcon from '../../images/trash_icon.svg';

const AddPhoto = ({ productData, setProductData, errorState }) => {
	const [ imageCount, setImageCount ] = useState(0);

	const [ loading, setLoading ] = useState(false);

	//Adding A photo
	const uploadImage = (e) => {
		setLoading(false);

		//Ensuring the photo isnt too large and the right file type
		if (imageCount === 3) {
			return 'Photo Limit Reach!';
		}

		if (e.target.files[0].size > 500000) {
			return alert('Photo is too large!');
		}

		if (e.target.files[0].type !== 'image/png' && e.target.files[0].type !== 'image/jpeg') {
			return alert('File type not accepted');
		}

		const files = e.target.files;
		setLoading(true);
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'ShoppingCart-Products');

		axios.post('https://api.cloudinary.com/v1_1/dnsl4nbz4/image/upload', data).then((res) => {
			setProductData({ ...productData, ['images']: [ ...productData.images, res.data.secure_url ] });
		});

		setImageCount(imageCount + 1);
		setLoading(false);
	};

	//Removing A photo

	function removePhoto(arg) {
		const newState = productData.images.filter((cv) => {
			return cv !== arg;
		});
		setImageCount(imageCount - 1);
		return setProductData({ ...productData, ['images']: newState });
	}

	return (
		<div className="photoContainer">
			<div className="PhotoHeaderContainer">
				<h3>Photos</h3>
				<input id="uploadButton" type="file" onChange={uploadImage} />
				<label
					className={imageCount === 3 ? 'fakeUploadButton buttonDisabled' : 'fakeUploadButton'}
					htmlFor="uploadButton"
				>
					Add Photo
				</label>
			</div>
			<h4 className="validationMessage">{imageCount === 3 ? 'Three photo limit met' : ''}</h4>
			{loading ? (
				'Loading...'
			) : (
				productData.images.map((cv) => {
					return (
						<div className="singleProductImage">
							<img className="productImage" src={cv} key={Math.random() * Math.random()} />
							<img
								className="trashIcon"
								src={trashIcon}
								onClick={() => {
									removePhoto(cv);
								}}
							/>
						</div>
					);
				})
			)}
			<div className={errorState === 'images' ? 'error' : 'hideError'}>You need to add a photo!</div>
		</div>
	);
};

export default AddPhoto;
