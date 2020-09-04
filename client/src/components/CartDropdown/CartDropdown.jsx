import React from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import CartItem from '../CartItem/CartItem';

import CustomButton from '../CustomButton/CustomButton';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import {
	CartDropdownContainer,
	CartItemsContainer,
	EmptyMessageContainer
} from './CartDropdown.styles';

const CartDropdown = ({ cartItems, history, dispatch }) => {
	return (
		<CartDropdownContainer>
			<CartItemsContainer>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} item={cartItem} />
					))
				) : (
					<EmptyMessageContainer>
						Your cart is empty
					</EmptyMessageContainer>
				)}
			</CartItemsContainer>
			<CustomButton
				onClick={() => {
					history.push('/checkout');
					dispatch(toggleCartHidden());
				}}
			>
				GO TO CHECKOUT
			</CustomButton>
		</CartDropdownContainer>
	);
};

const mapStateToProps = (state) => ({
	cartItems : selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
