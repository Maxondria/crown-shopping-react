import { UPDATE_COLLECTIONS } from "../../constants/actionTypes";

export const updateCollections = collections => ({
  type: UPDATE_COLLECTIONS,
  payload: { collections }
});
