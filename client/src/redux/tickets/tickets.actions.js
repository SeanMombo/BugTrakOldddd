import TicketActionTypes from './tickets.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchTicketsStart = (collectionsMap) => ({
    type: TicketActionTypes.FETCH_TICKETS_START,
})

export const fetchTicketsSuccess = collectionsMap => ({
    type: TicketActionTypes.FETCH_TICKETS_SUCCESS,
    payload: collectionsMap
})

export const fetchTicketsFailure = errorMessage => ({
    type: TicketActionTypes.FETCH_TICKETS_FAILURE,
    payload: errorMessage
})

