import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../Auth/axiosWithAuth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, message, Modal, Upload, Icon, Spin } from 'antd';
import Logo from '../elements/logo';
import { logout, setLoading, setStore as updateStore, deleteAccount, getCurrentUser } from '../../state/actionCreators';
import history from '../../history';
import axios from 'axios';
import logo from '../../images/PureRetail_Logo.png';

const storeUrl = 'https://shopping-cart-be.herokuapp.com/api/store/';
const updatePhoneUrl = 'https://shopping-cart-be.herokuapp.com/api/auth/phone';

const { Option } = Select;

const EditProfile = ({ dispatch, isLoading, form }) => {
	const [ store, setStore ] = useState({
		ownerName: '',
		currency: '',
		storeName: '',
		imageUrl: '',
		address: ''
	});

	useEffect(
		() => {
			dispatch(setLoading(true));
			dispatch(getCurrentUser());
			axiosWithAuth()
				.get(storeUrl)
				.then((res) => {
					const { ownerName, currency, storeName, address, imageUrl, phone } = res.data;
					setStore({ ownerName, currency, storeName, address, imageUrl, phone });
					dispatch(setLoading(false));
				})
				.catch((err) => {
					dispatch(setLoading(false));
					console.log(err);
				});
		},
		[ dispatch ]
	);

	const [ errors, setErrors ] = useState({});

	const handleChange = (e) => {
		setStore({ ...store, [e.target.name]: e.target.value });
	};

	const handleLogout = () => {
		// delete token from local storage and redirect to login
		dispatch(logout());
		history.push('/');
	};

	const handleDeleteAccount = () => {
		const { confirm } = Modal;
		confirm({
			title: 'Are you sure you want to delete your account?',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				dispatch(setLoading(true));
				dispatch(deleteAccount());
				dispatch(logout());
				history.push('/register');
			},
			onCancel() {}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setLoading(true));
		setErrors({});
		form.validateFieldsAndScroll({ force: true }, async (err, values) => {
			if (err) {
				message.error('Enter Required Fields');
			}

			const payload = {
				ownerName: values.ownerName,
				currency: values.currency,
				address: values.address,
				storeName: values.storeName,
				imageUrl: store.imageUrl
			};

			try {
				await axiosWithAuth().put(updatePhoneUrl, {
					phone: store.phone
				});

				const response = await axiosWithAuth().put(storeUrl, payload);
				if (response) {
					dispatch(updateStore(response.data));
					message.success('Your store has been updated');
					history.push('/dashboard');
				}
			} catch (errors) {
				dispatch(setLoading(false));
				message.error(Object.values(errors.response.data)[0]);
				return setErrors(Object.values(errors.response.data)[0]);
			}
		});
	};

	const dummyRequest = ({ file, onSuccess }) => {
		const image = new FormData();
		image.append('upload_preset', 'pure-retail');
		image.append('file', file);
		const config = {
			headers: { 'X-Requested-With': 'XMLHttpRequest' }
		};
		axios.post('https://api.cloudinary.com/v1_1/pureretail/upload', image, config).then((res) => {
			const secureUrl = res.data.secure_url;
			setStore({ ...store, imageUrl: secureUrl });
		});
	};

	const { getFieldDecorator } = form;

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8 }
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 }
		}
	};
	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0
			},
			sm: {
				span: 16,
				offset: 8
			}
		}
	};

	const createStore = (
		<div className="cover" style={{ height: 'auto' }}>
			<Logo />
			<p className="text">You currently haven't created a store yet</p>
			<p className="text">
				Click{' '}
				<Link className="link" to="/createstore">
					here
				</Link>{' '}
				to create one
			</p>
			<Button onClick={handleLogout} type="primary" htmlType="button">
				Logout
			</Button>
		</div>
	);

	const editProfile = (
		<Spin spinning={isLoading}>
			<div className="cover" style={{ height: 'auto', flexDirection: 'column' }}>
				<div id="add-logo-image">
					<Upload
						name="avatar"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						customRequest={dummyRequest}
					>
						<img
							src={store.imageUrl ? store.imageUrl : logo}
							alt="avatar"
							style={{
								width: '100%',
								height: '100%',
								position: 'relative',
								opacity: '0.5'
							}}
						/>
						<Icon
							type="camera"
							style={{
								position: 'relative',
								bottom: '28px',
								left: '28px',
								fontSize: '23px'
							}}
						/>
					</Upload>
				</div>
				<Form {...formItemLayout} onSubmit={handleSubmit}>
					<div id="header" style={{ margin: '2rem' }}>
						Edit your profile
					</div>

					<Form.Item>
						{getFieldDecorator('phone', {
							initialValue: store && store.phone && store.phone.toString(),
							rules: [
								{
									message: 'Enter valid Whatsapp number'
								},
								{
									required: true,
									message: 'Enter valid Whatsapp number'
								}
							]
						})(<Input onChange={handleChange} name="phone" placeholder="e.g. 2348000001231" />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('ownerName', {
							initialValue: store.ownerName,
							rules: [
								{
									message: 'Enter your name'
								},
								{
									required: true,
									message: 'Enter your name'
								}
							]
						})(<Input onChange={handleChange} name="ownerName" placeholder="Name of Store owner" />)}
					</Form.Item>

					<Form.Item hasFeedback>
						{getFieldDecorator('currency', {
							initialValue: store.currency,
							rules: [
								{
									required: true,
									message: 'Select preferred currency'
								}
							]
						})(
							<Select name="currency" placeholder="Select your currency">
								<Option value="POU">British Pounds (GBP / £)</Option>
								<Option value="EUR">Euros (EUR / €)</Option>
								<Option value="YEN">Japanse Yen (JPY / ¥)</Option>
								<Option value="DOL">US Dollars (USD / $)</Option>
							</Select>
						)}
					</Form.Item>

					<Form.Item>
						{getFieldDecorator('storeName', {
							initialValue: store.storeName,
							rules: [
								{
									message: 'Store name is required'
								},
								{
									required: true,
									message: 'Store name is required'
								}
							]
						})(<Input onChange={handleChange} name="storeName" placeholder="Store name" />)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('address', {
							initialValue: store.address,
							rules: [
								{
									message: 'Store address is required'
								},
								{
									required: true,
									message: 'Store address is required'
								}
							]
						})(<Input onChange={handleChange} name="address" placeholder="Store address" />)}
					</Form.Item>

					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">
							Update
						</Button>
					</Form.Item>

					<Form.Item {...tailFormItemLayout}>
						<Button onClick={handleLogout} type="primary" htmlType="button">
							Logout
						</Button>
					</Form.Item>

					<Form.Item {...tailFormItemLayout}>
						<Button
							onClick={handleDeleteAccount}
							id="delete-btn"
							type="link"
							htmlType="button"
							style={{ marginBottom: '25px' }}
						>
							Delete account
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Spin>
	);

	return errors.message === 'There is no store with that id' ? createStore : editProfile;
};

const EditForm = Form.create()(EditProfile);

const mapStateToProps = (state) => ({
	isLoading: state.user.isLoading,
	imageUrl: state.user.user.imageUrl
});

export default connect(mapStateToProps, null)(EditForm);
