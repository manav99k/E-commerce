import styled, { css } from 'styled-components';

const darkMode = () => {
	return window.matchMedia('(prefers-color-scheme: dark)')
		? css`
				background-color: #202020;
				color: #fff;
			`
		: '';
};

export const CartDropdownContainer = styled.div`
	position: absolute;
	width: 240px;
	height: 340px;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid #000;
	background-color: #fff;
	top: 80px;
	right: 0;
	z-index: 5;

	${darkMode};
`;

export const CartItemsContainer = styled.div`
	height: 240px;
	display: flex;
	flex-direction: column;
	overflow: scroll;
`;

export const EmptyMessageContainer = styled.span`
	font-size: 18px;
	margin: 50px auto;
`;
