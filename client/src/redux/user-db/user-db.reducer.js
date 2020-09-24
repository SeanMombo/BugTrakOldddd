
import UserDBActionTypes from './user-db.types';

const INITIAL_STATE = {
    collections: null,
    searchKey: '',
    isFetching: false,
    errorMessage: undefined
}

const userDBReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserDBActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case UserDBActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case UserDBActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case UserDBActionTypes.UPDATE_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.payload
            }
        case UserDBActionTypes.UPDATE_USER_ROLE:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default userDBReducer;