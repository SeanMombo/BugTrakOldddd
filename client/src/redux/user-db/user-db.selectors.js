import { createSelector } from 'reselect';


const selectUserDB = state => state.userdb;

export const selectCollections = createSelector(
    [selectUserDB],
    userdb => userdb.collections
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