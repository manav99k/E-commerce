import React from 'react';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { AiOutlineShopping } from 'react-icons/ai';
import { CartIconContainer, ItemCountContainer } from './CartIcon.styles';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
	return (
		<CartIconContainer onClick={toggleCartHidden}>
			<AiOutlineShopping
				style={{
					width  : '30px',
					height : '30px'
				}}
			/>
			<ItemCountContainer>{itemCount}</ItemCountContainer>
		</CartIconContainer>
	);
};

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden : () => dispatch(toggleCartHidden())
});

const mapStateToProps = (state) => ({
	itemCount : selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
