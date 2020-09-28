import { all, call } from 'redux-saga/effects';
import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas'
import { cartSagas } from './cart/cart.sagas'
import { userDBSagas } from './user-db/user-db.sagas'
import { projectSagas } from './projects/projects.sagas'

export default function* rootSaga() {
    yield all([call(userSagas), call(userDBSagas), call(projectSagas)]);
}