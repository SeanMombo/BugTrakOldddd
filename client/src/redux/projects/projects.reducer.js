
import ProjectsActionTypes from './projects.types';

const INITIAL_STATE = {
    projects: null,
    users_projects: null,
    selectedProject: null,
    searchKey: '',
    isFetching: false,
    errorMessage: undefined
}

const projectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProjectsActionTypes.FETCH_PROJECTS_START:
            return {
                ...state,
                isFetching: true
            }
        case ProjectsActionTypes.FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                projects: action.payload
            }
        case ProjectsActionTypes.FETCH_PROJECTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ProjectsActionTypes.FETCH_USERS_PROJECTS_START:
            return {
                ...state,
                isFetching: true
            }
        case ProjectsActionTypes.FETCH_USERS_PROJECTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users_projects: action.payload
            }
        case ProjectsActionTypes.FETCH_USERS_PROJECTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ProjectsActionTypes.CREATE_PROJECT_START:
            return {
                ...state,
                isFetching: true,
            }
        case ProjectsActionTypes.CREATE_PROJECT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }

        case ProjectsActionTypes.UPDATE_USERS_PROJECTS_START:
            return {
                ...state,
                isFetching: true
            }
        case ProjectsActionTypes.UPDATE_USERS_PROJECTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                // users_projects: action.payload
            }
        case ProjectsActionTypes.UPDATE_USERS_PROJECTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        case ProjectsActionTypes.UPDATE_PROJECT_SEARCH_KEY:
            return {
                ...state,
                searchKey: action.payload
            }
        case ProjectsActionTypes.SELECT_PROJECT:
            return {
                ...state,
                selectedProject: action.payload
            }
    
        default:
            return state;
    }
}

export default projectReducer;