import React, { useEffect, lazy, Suspense } from 'react';

import { Route } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import Spinner from '../../components/Spinner/Spinner';

const CollectionOverviewContainer = lazy(() =>
	import('../../components/CollectionOverview/CollectionOverview.container')
);
const CollectionPageContainer = lazy(() =>
	import('../Collection/Collection.container')
);

const ShopPage = ({ match, fetchCollectionsStartAsync }) => {
	useEffect(() => {
		fetchCollectionsStartAsync();
	}, []);
	return (
		<div className="shop-page">
			<Suspense fallback={<Spinner />}>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionOverviewContainer}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					component={CollectionPageContainer}
				/>
			</Suspense>
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
