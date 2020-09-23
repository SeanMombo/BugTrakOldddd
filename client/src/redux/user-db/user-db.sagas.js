import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertUsersToMap } from '../../firebase/firebase.utils';
import {
    fetchCollectionsFailure,
    fetchCollectionsSuccess
} from './user-db.actions'
import UserDBActionTypes from './user-db.types';


export function* fetchCollectionsAsync() {
    yield console.log('fired');

    try {
        const collectionRef = firestore.collection('users');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertUsersToMap, snapshot);

        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        UserDBActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync)
}

export function* userDBSagas() {
    yield all([call(fetchCollectionsStart)])
}