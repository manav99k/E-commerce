import React, { useState, useEffect } from 'react';

import { Route } from 'react-router-dom';

import CollectionOverviewContainer from '../../components/CollectionOverview/CollectionOverview.container';
import CollectionPageContainer from '../Collection/Collection.container';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/WithSpinner/WithSpinner';

const ShopPage = ({
	match,
	isCollectionLoaded,
	fetchCollectionsStartAsync
}) => {
	useEffect(() => {
		fetchCollectionsStartAsync();
	}, []);
	return (
		<div className="shop-page">
			<Route
				exact
				path={`${match.path}`}
				component={CollectionOverviewContainer}
			/>
			<Route
				path={`${match.path}/:collectionId`}
				component={CollectionPageContainer}
			/>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	isCollectionLoaded : selectIsCollectionsLoaded
});

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStartAsync : () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
