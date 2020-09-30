import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import {
    fetchTicketsFailure,
    fetchTicketsSuccess
} from './tickets.actions'
import TicketActionTypes from './tickets.types';


export function* fetchCollectionsAsync() {
    yield console.log('fired fetchCollectionsAsync');

    try {
        const collectionRef = firestore.collection('tickets');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchTicketsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchTicketsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        TicketActionTypes.FETCH_TICKETS_START, 
        fetchCollectionsAsync)
}

export function* ticketSagas() {
    yield all([call(fetchCollectionsStart)])
}