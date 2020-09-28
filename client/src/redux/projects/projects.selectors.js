import { createSelector } from 'reselect';


const selectProject = state => state.project;
const getKeyword = state => selectProject.searchKey;


export const selectCollections = createSelector(
    [selectProject],
    project => project.projects
)

export const selectSearchKey = createSelector(
    [selectProject],
    project => project.searchKey
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    projects => projects ? Object.keys(projects).map(key => projects[key]) : []
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        projects => (projects ? projects[collectionUrlParam] : null)
    )

export const selectIsCollectionFetching = createSelector(
    [selectProject],
    project => project.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    [selectProject],
    project => !!project.projects
)
                  
export const selectFilteredProjects = createSelector(
    [selectCollections],
    projects => projects ? Object.keys(projects).map(key => projects[key]) : []
);

    
