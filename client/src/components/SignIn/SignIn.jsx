import React, { useState } from 'react';
import './SignIn.scss';
import FormInput from '../FormInput/FormInput';
import CustomButton from '../CustomButton/CustomButton';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = (props) => {
	const [
		email,
		setEmail
	] = useState('');
	const [
		password,
		setpassword
	] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			setEmail('');
			setpassword('');
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'email') setEmail(value);
		else setpassword(value);
	};

	return (
		<div className="sign-in">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					type="email"
					name="email"
					value={email}
					required
					handleChange={handleChange}
					label="Email"
				/>
				<FormInput
					type="password"
					name="password"
					value={password}
					required
					handleChange={handleChange}
					label="Password"
				/>
				<div className="buttons">
					<CustomButton type="submit">Sign In</CustomButton>
					<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
						Sign In with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
