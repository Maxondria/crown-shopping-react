import { takeLatest, call, put, all } from "redux-saga/effects";
import { SIGN_OUT_SUCCESS } from "../../constants/actionTypes";
import { clearCart } from "../../reducers/cart/cart.actions";

const onSignOutClearCartWorkerSaga = function*() {
  yield put(clearCart());
};

const onSignOutClearCartSaga = function*() {
  yield takeLatest(SIGN_OUT_SUCCESS, onSignOutClearCartWorkerSaga);
};

export function* cartSagas() {
  yield all([call(onSignOutClearCartSaga)]);
}
