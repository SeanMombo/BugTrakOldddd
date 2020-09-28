import UserDBActionTypes from './user-db.types';
import { firestore, convertUsersToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = (collectionsMap) => ({
    type: UserDBActionTypes.FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: UserDBActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: UserDBActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const updateUserRoleSuccess = collectionsMap => ({
    type: UserDBActionTypes.UPDATE_USER_ROLE_SUCCESS,
    payload: collectionsMap
})

export const updateUserRoleFailure = errorMessage => ({
    type: UserDBActionTypes.UPDATE_USER_ROLE_FAILURE,
    payload: errorMessage
})

export function updateSearchKey(key) {
    return {
      type: UserDBActionTypes.UPDATE_SEARCH_KEY,
      payload: key,
    };
  }

export function updateUserRole({user, role}) {
    return {
        type: UserDBActionTypes.UPDATE_USER_ROLE,
        payload: {user, role},
    }
}

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('users');
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertUsersToMap(snapshot);
            console.log(collectionsMap)
            dispatch(fetchCollectionsSuccess(collectionsMap));
            
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}

