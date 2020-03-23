import { createSelector } from "reselect";

const selectShop = ({ shop }) => shop;

const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);

export const selectFetchingCollectionsErrorMessage = createSelector(
  [selectShop],
  shop => shop.errorMessage
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => (collections ? Object.values(collections) : [])
);

export const selectCollection = collectionUrlParam =>
  createSelector([selectCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  );
