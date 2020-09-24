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

// export const searchCollection = () => {
    
   
//         const filtered = Object.keys(collection).filter(key => {
//           let name = collection[key]['displayName'];
//           let email = collection[key]['email'];
//           let type = collection[key]['userType'];
  
//           //make sure field is not undefined before we search with 'include'
//           if (name) name = name.includes(event.target.value);
//           if (email) email = email.includes(event.target.value);
//           if (type) type = type.includes(event.target.value);
//           return name || email || type;
//         });  

//         const newCollection = {};
//         for(let k of filtered) {
//           newCollection[k] = collection[k]
//         }

   
// }