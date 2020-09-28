import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertUsersToMap, getCurrentUser } from '../../firebase/firebase.utils';
import {
    fetchCollectionsFailure,
    fetchCollectionsSuccess,
    fetchCollectionsStart,
    updateUserRoleFailure,
    updateUserRoleSuccess,
} from './user-db.actions'
import UserDBActionTypes from './user-db.types';


export function* fetchCollectionsAsync() {
    yield console.log('fired fetchCollectionsAsync');

    try {
        const collectionRef = firestore.collection('users');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertUsersToMap, snapshot);

        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}



export function* updateUserRoleAsync({payload: { user, role }}) {
    yield console.log('fired updateUserRoleAsync');
    console.log(user)
    
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        const currentUserRef = firestore.collection('users').doc(userAuth.uid);

        currentUserRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                if (doc.data().userType !== 'admin') {
                    alert('You do not have permission to change user roles')
                    return;
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } catch (error) {
        yield put(updateUserRoleFailure(error.message));
    }


    try {
    
        const collectionRef = firestore.collection('users').doc(user.id);
        
        yield collectionRef.update({
            'userType': role
        });

         yield put(fetchCollectionsStart());
    } catch (error) {
         yield put(updateUserRoleFailure(error.message));
    }
}


export function* fetchCollectionsStartSaga() {
    yield takeLatest(
        UserDBActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync)
}

export function* changeUserRole() {
    yield takeLatest(
        UserDBActionTypes.UPDATE_USER_ROLE, 
        updateUserRoleAsync)
}

export function* userDBSagas() {
    yield all([
        call(fetchCollectionsStartSaga), 
        call(changeUserRole),
    ])
}