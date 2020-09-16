import React from 'react';

import { CartItemContainer, ItemDetailsContainer } from './CartItem.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
	return (
		<CartItemContainer>
			<img src={imageUrl} alt="item" style={{ width: '30%' }} />
			<ItemDetailsContainer>
				<span
					style={{
						fontSize : '16px'
					}}
				>
					{name}
				</span>
				<span className="price">
					{quantity} x ${price}
				</span>
			</ItemDetailsContainer>
		</CartItemContainer>
	);
};

export default React.memo(CartItem);
