import { createSelector } from 'reselect';


const selectProject = state => state.project;
const getKeyword = state => selectProject.searchKey;


export const selectCollections = createSelector(
    [selectProject],
    project => project.projects
)

export const selectUsersProjects = createSelector(
    [selectProject],
    project => project.users_projects
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

export const selectSelectedProject = createSelector(
    [selectProject],
    project => project.selectedProject
)

export const selectUsersProjectsArray = createSelector(
    [selectUsersProjects],
    users_projects => users_projects ? Object.keys(users_projects).map(key => users_projects[key]) : []
)
                  
// export const selectFilteredProjects = createSelector(
//     [selectCollections],
//     projects => projects ? Object.keys(projects).map(key => projects[key]) : []
// );

                   
export const selectFilteredProjects = createSelector(
    [selectCollections, selectSearchKey],
    (projects, searchKey) => {
        searchKey = searchKey.toLowerCase();

        if (projects) {

            let userArr = Object.keys(projects).map(key => projects[key]);
            // console.log(searchKey)
            if (searchKey === '') return userArr;
            // console.log(userArr)
            let filteredUsers = userArr.filter(user => {

                let title = user['title']
                let body = user['body']
                
                //make sure field is not undefined before we search with 'include'
                if (title) title = title.toLowerCase().includes(searchKey);
                if (body) body = body.toLowerCase().includes(searchKey);

                if (title || body) 
                    return true; 
                else 
                    return false;
            })
            return filteredUsers;
        } else {
            return [];
        }
    }
);
