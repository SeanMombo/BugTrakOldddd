import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertProjectsToMap } from '../../firebase/firebase.utils';
import {
    fetchProjectsFailure,
    fetchProjectsSuccess,
    fetchProjectsStart,
    createProjectFailure
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

export function* createProjectAsync({payload: {title, body}}) {
    yield console.log('fired createProjectAsync');

    try {
        firestore.collection("projects").add({
            title: title,
            body: body,
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
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

export function* createProjectStart() {
    yield takeLatest(
        ProjectsActionTypes.CREATE_PROJECT_START, 
        createProjectAsync)
}


export function* projectSagas() {
    yield all([call(fetchProjectsStartSaga)])
}