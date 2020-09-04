import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import Header from './components/Header/Header';
import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/Shop/Shop';
import SignInAndSignUpPage from './pages/SignInAndSignUpPage/SignInAndSignUpPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

function App(props) {
	var unsubscribeFromAuth = null;

	const { setCurrentUser } = props;

	useEffect(() => {
		unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = createUserProfileDocument(userAuth, []);

				(await userRef).onSnapshot((snapshot) => {
					setCurrentUser({
						id : snapshot.id,
						...snapshot.data()
					});
				});
			}
			setCurrentUser(userAuth);
		});

		return () => {
			unsubscribeFromAuth();
		};
	}, []);

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={Homepage} />
				<Route path="/shop" component={ShopPage} />
				<Route exact path="/checkout" component={CheckoutPage} />
				<Route
					exact
					path="/signin"
					render={() =>
						props.currentUser ? (
							<Redirect to="/" />
						) : (
							<SignInAndSignUpPage />
						)}
				/>
			</Switch>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	currentUser : selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser : (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
