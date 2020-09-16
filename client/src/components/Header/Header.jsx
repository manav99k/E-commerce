import React from 'react';

import { auth } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectCurrentUser,
	selectCartHidden
} from '../../redux/user/user.selectors';

import {
	HeaderContainer,
	LogoContainer,
	OptionContainer,
	OptionLink
} from './Header.styles';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';

const Header = ({ currentUser, hidden }) => {
	return (
		<HeaderContainer>
			<LogoContainer to={''}>
				<Logo className="logo" />
			</LogoContainer>
			<OptionContainer>
				<OptionLink to="/shop">SHOP</OptionLink>
				<OptionLink to="/contact">CONTACT</OptionLink>
				{currentUser ? (
					<OptionLink as="div" onClick={() => auth.signOut()}>
						SIGN OUT
					</OptionLink>
				) : (
					<OptionLink to="/signin">SIGN IN</OptionLink>
				)}
			</OptionContainer>
			<CartIcon />
			{!hidden && <CartDropdown />}
		</HeaderContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser : selectCurrentUser,
	hidden      : selectCartHidden
});

export default connect(mapStateToProps)(Header);
