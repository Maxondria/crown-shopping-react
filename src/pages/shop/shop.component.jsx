import React, { Component } from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { fetchCollectionsStartAsync } from "../../redux/reducers/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded
} from "../../redux/reducers/shop/shop.selector";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  async componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isLoading, isCollectionsLoaded } = this.props;
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
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionLoaded
});

const mapDispatchToProps = { fetchCollectionsStartAsync };

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
