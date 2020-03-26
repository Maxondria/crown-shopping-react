import React, { useEffect } from "react";
import { compose } from "redux";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/reducers/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded
} from "../../redux/reducers/shop/shop.selector";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({
  match,
  isLoading,
  fetchCollectionsStart,
  isCollectionsLoaded
}) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={routeProps => (
          <CollectionsOverviewWithSpinner
            {...routeProps}
            isLoading={isLoading}
          />
        )}
      />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        render={routeProps => (
          <CollectionsPageWithSpinner
            {...routeProps}
            isLoading={!isCollectionsLoaded}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionLoaded
});

const mapDispatchToProps = { fetchCollectionsStart };

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ShopPage);
