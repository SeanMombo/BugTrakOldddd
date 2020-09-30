import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap, convertTicketsToMap } from '../../firebase/firebase.utils';
import {
    fetchTicketsFailure,
    fetchTicketsSuccess
} from './tickets.actions'
import TicketActionTypes from './tickets.types';


export function* fetchTicketsStartAsync({payload: {projectId}}) {
    yield console.log('fired fetchCollectionsAsync');

    try {
        const ticketRef = firestore.collection('tickets');

        const query = yield ticketRef.where("projectId", "==", projectId);
        

        // yield console.log(snapshot);
        // yield console.log(collectionsMap)
        const snapshot = yield query.get();
        const collectionsMap = yield call(convertTicketsToMap, snapshot);

        
        yield put(fetchTicketsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchTicketsFailure(error.message));
    }
}

export function* fetchTicketsStart() {
    yield takeLatest(
        TicketActionTypes.FETCH_TICKETS_START, 
        fetchTicketsStartAsync)
}

export function* ticketSagas() {
    yield all([call(fetchTicketsStart)])
}