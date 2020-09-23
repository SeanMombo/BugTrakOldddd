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