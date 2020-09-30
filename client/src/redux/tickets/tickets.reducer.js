
import TicketActionTypes from './tickets.types';

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: 'testerror'
}

const TicketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TicketActionTypes.FETCH_TICKETS_START:
            return {
                ...state,
                isFetching: true
            }
        case TicketActionTypes.FETCH_TICKETS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case TicketActionTypes.FETCH_TICKETS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }

        default:
            return state;
    }
}

export default TicketReducer;