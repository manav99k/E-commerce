import React, { useState } from 'react';

import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './SignUp.scss';

const SignUp = () => {
	const [
		userDetails,
		setUserDetails
	] = useState({
		displayName     : '',
		email           : '',
		password        : '',
		confirmPassowrd : ''
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (userDetails.password !== userDetails.confirmPassowrd) {
			alert("Passwords don't match");
			return;
		}
		try {
			const { displayName, email, password } = userDetails;
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await createUserProfileDocument(user, { displayName });
			setUserDetails({
				displayName     : '',
				email           : '',
				password        : '',
				confirmPassowrd : ''
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case 'displayName':
				setUserDetails({
					...userDetails,
					displayName : value
				});
				break;
			case 'email':
				setUserDetails({
					...userDetails,
					email : value
				});
				break;
			case 'password':
				setUserDetails({
					...userDetails,
					password : value
				});
				break;
			case 'confirmPassword':
				setUserDetails({
					...userDetails,
					confirmPassowrd : value
				});
				break;
		}
	};

	return (
		<div className="sign-up">
			<h2 className="title">I do not have an account</h2>
			<span>Sign Up with your email and password</span>
			<form className="sign-up-form" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="displayName"
					value={userDetails.displayName}
					onChange={handleChange}
					label="Display Name"
					required
				/>
				<FormInput
					type="email"
					name="email"
					value={userDetails.email}
					onChange={handleChange}
					label="Email Address"
					required
				/>
				<FormInput
					type="password"
					name="password"
					value={userDetails.password}
					onChange={handleChange}
					label="Password"
					required
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={userDetails.confirmPassowrd}
					onChange={handleChange}
					label="Confirm Password"
					required
				/>
				<CustomButton type="submit">Sign Up</CustomButton>
			</form>
		</div>
	);
};

export default SignUp;
