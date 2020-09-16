import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import { GlobalStyle } from './global.styles';

import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const Homepage = lazy(() => import('./pages/homepage/Homepage.component'));
const ShopPage = lazy(() => import('./pages/Shop/Shop'));
const SignInAndSignUpPage = lazy(() =>
	import('./pages/SignInAndSignUpPage/SignInAndSignUpPage')
);
const CheckoutPage = lazy(() => import('./pages/CheckoutPage/CheckoutPage'));

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
			<GlobalStyle />
			<Header />
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<Spinner />}>
						<Route exact path="/" component={Homepage} />
						<Route path="/shop" component={ShopPage} />
						<Route
							exact
							path="/checkout"
							component={CheckoutPage}
						/>
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
					</Suspense>
				</ErrorBoundary>
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
