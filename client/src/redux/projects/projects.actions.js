import ProjectsActionTypes from './projects.types';
import { firestore, convertUsersToMap } from '../../firebase/firebase.utils';

export const fetchProjectsStart = (collectionsMap) => ({
    type: ProjectsActionTypes.FETCH_PROJECTS_START,
})

export const fetchProjectsSuccess = collectionsMap => ({
    type: ProjectsActionTypes.FETCH_PROJECTS_SUCCESS,
    payload: collectionsMap
})

export const fetchProjectsFailure = errorMessage => ({
    type: ProjectsActionTypes.FETCH_PROJECTS_FAILURE,
    payload: errorMessage
})

export const fetchUsersProjectsStart = (collectionsMap) => ({
    type: ProjectsActionTypes.FETCH_USERS_PROJECTS_START,
})

export const fetchUsersProjectsSuccess = collectionsMap => ({
    type: ProjectsActionTypes.FETCH_USERS_PROJECTS_SUCCESS,
    payload: collectionsMap
})

export const fetchUsersProjectsFailure = errorMessage => ({
    type: ProjectsActionTypes.FETCH_USERS_PROJECTS_FAILURE,
    payload: errorMessage
})

export const updateUsersProjectsStart = (collectionsMap) => ({
    type: ProjectsActionTypes.UPDATE_USERS_PROJECTS_START,
})

export const updateUsersProjectsSuccess = collectionsMap => ({
    type: ProjectsActionTypes.UPDATE_USERS_PROJECTS_SUCCESS,
    payload: collectionsMap
})

export const updateUsersProjectsFailure = errorMessage => ({
    type: ProjectsActionTypes.UPDATE_USERS_PROJECTS_FAILURE,
    payload: errorMessage
})


export const createProjectStart = (collectionsMap) => ({
    type: ProjectsActionTypes.CREATE_PROJECT_START,
})


export const createProjectFailure = errorMessage => ({
    type: ProjectsActionTypes.CREATE_PROJECT_FAILURE,
    payload: errorMessage
})


export function updateSearchKey(key) {
    return {
      type: ProjectsActionTypes.UPDATE_PROJECT_SEARCH_KEY,
      payload: key,
    };
}

export function createProject(data) {
    return {
        type: ProjectsActionTypes.CREATE_PROJECT_START,
        payload: data,
    }
}

export function selectProject(proj) {
    return {
      type: ProjectsActionTypes.SELECT_PROJECT,
      payload: proj,
    };
}

export function updateUsersProjects(data) {
    return {
      type: ProjectsActionTypes.UPDATE_USERS_PROJECTS_START,
      payload: data,
    };
}

// export const fetchProjectsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('projects');
//         dispatch(fetchProjectsStart());

//         collectionRef.get().then(snapshot => {
//             const collectionsMap = convertUsersToMap(snapshot);
//             console.log(collectionsMap)
//             dispatch(fetchProjectsSuccess(collectionsMap));
            
//         }).catch(error => dispatch(fetchProjectsFailure(error.message)));
//     }
// }
