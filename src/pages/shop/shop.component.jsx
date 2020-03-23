import React, { Component } from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/reducers/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    loading: true
  };

  unSubsribeFromSnapshot = null;

  async componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    const snapshot = await collectionRef.get();
    const collections = convertCollectionsSnapshotToMap(snapshot);
    updateCollections(collections);
    this.setState({ loading: false });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={routeProps => (
            <CollectionsOverviewWithSpinner
              {...routeProps}
              isLoading={loading}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={routeProps => (
            <CollectionsPageWithSpinner {...routeProps} isLoading={loading} />
          )}
        />
      </div>
    );
  }
}

export default connect(undefined, { updateCollections })(ShopPage);
