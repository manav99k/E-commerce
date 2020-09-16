import styled, { css } from 'styled-components';

const CustomButtonStyles = css`
	background-color: black;
	color: white;
	&:hover {
		background-color: white;
		color: black;
		border: 1px solid black;
	}
`;

const GoogleSignInStyles = css`
	background-color: #4285f4;
	color: #fff;

	&:hover {
		background-color: #357ae8;
		border: none;
	}
	@media screen and (max-width: 800px) {
		padding: 0;
		display: block;
	}
`;

const InvertedSignInStyles = css`
	background-color: #fff;
	color: #000;
	border: 1px solid #000;

	&:hover {
		background-color: #000;
		color: #fff;
	}
`;

const getButtonStyles = (props) => {
	if (props.isGoogleSignIn) return GoogleSignInStyles;
	return props.inverted ? InvertedSignInStyles : CustomButtonStyles;
};

export const CustomButtonContainer = styled.button`
	margin-top: 10px;
	min-width: 165px;
	width: auto;
	height: 50px;
	border: none;
	letter-spacing: 0.5px;
	line-height: 50px;
	padding: 0 35px 0 35px;
	font-size: 15px;
	text-transform: uppercase;
	font-family: 'Open Sans Condensed';
	font-weight: bolder;
	cursor: pointer;
	display: flex;
	justify-content: center;
	${getButtonStyles};
`;
