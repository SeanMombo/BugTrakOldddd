import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertProjectsToMap, convertUsersProjectsToMap} from '../../firebase/firebase.utils';
import firebase from 'firebase/app'
import {
    fetchProjectsFailure,
    fetchProjectsSuccess,
    fetchProjectsStart,
    createProjectFailure,
    fetchUsersProjectsFailure,
    fetchUsersProjectsStart,
    fetchUsersProjectsSuccess,
} from './projects.actions'
import ProjectsActionTypes from './projects.types';


export function* fetchCollectionsAsync() {
    yield console.log('fired projects');

    try {
        const collectionRef = firestore.collection('projects');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertProjectsToMap, snapshot);

        yield put(fetchProjectsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchProjectsFailure(error.message));
    }
}

export function* fetchUsersProjectsAsync() {
    yield console.log('fired projects');

    try {
        const collectionRef = firestore.collection('users_projects');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertUsersProjectsToMap, snapshot);

        yield put(fetchUsersProjectsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchUsersProjectsFailure(error.message));
    }
}

export function* createProjectAsync({payload: {title, body}}) {
    yield console.log('fired createProjectAsync');
    let projID;
    
    try {
        firestore.collection("projects").add({
            title: title,
            body: body,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function(docRef) {
            console.log("Project Successfully created");
            projID = docRef.id;

            firestore.collection("users_projects").doc(projID).set({
                users: [],
                dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(function() {
                console.log("users_project successfully created");
            })
            // .catch(function(error) {
            //     console.error("Error writing document: ", error);
            // });
        })
        // .catch(function(error) {
        //     console.error("Error writing document: ", error);
        // });

        


        yield put(fetchProjectsStart());
    } catch (error) {
        yield put(createProjectFailure(error.message));
    }
}


export function* fetchProjectsStartSaga() {
    yield takeLatest(
        ProjectsActionTypes.FETCH_PROJECTS_START, 
        fetchCollectionsAsync)
}

export function* fetchUsersProjectsStartSaga() {
    yield takeLatest(
        ProjectsActionTypes.FETCH_USERS_PROJECTS_START, 
        fetchUsersProjectsAsync)
}

export function* createProjectStart() {
    yield takeLatest(
        ProjectsActionTypes.CREATE_PROJECT_START, 
        createProjectAsync)
}


export function* projectSagas() {
    yield all([
        call(fetchProjectsStartSaga),
        call(createProjectStart),
        call(fetchUsersProjectsStartSaga),
    ])
}