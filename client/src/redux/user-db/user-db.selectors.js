import { createSelector } from 'reselect';


const selectUserDB = state => state.userdb;
const getKeyword = state => selectUserDB.searchKey;


export const selectCollections = createSelector(
    [selectUserDB],
    userdb => userdb.collections
)

export const selectSearchKey = createSelector(
    [selectUserDB],
    userdb => userdb.searchKey
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
    )

export const selectIsCollectionFetching = createSelector(
    [selectUserDB],
    userdb => userdb.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    [selectUserDB],
    userdb => !!userdb.collections
)


                        
export const selectFilteredUsers = createSelector(
    [selectCollections, selectSearchKey],
    (collections, searchKey) => {
        searchKey = searchKey.toLowerCase();

        if (collections) {

            let userArr = Object.keys(collections).map(key => collections[key]);
            console.log(searchKey)
            if (searchKey === '') return userArr;
            console.log(userArr)
            let filteredUsers = userArr.filter(user => {

                let name = user['displayName']
                let email = user['email']
                let type = user['userType']
                
                //make sure field is not undefined before we search with 'include'
                if (name) name = name.toLowerCase().includes(searchKey);
                if (email) email = email.toLowerCase().includes(searchKey);
                if (type) type = type.toLowerCase().includes(searchKey);
                if (name || email || type) 
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

       
