import { createSelector } from 'reselect';


const selectTickets = state => state.tickets;

// export const selectCollections = createSelector(
//     [selectTickets],
//     shop => shop.collections
// )

// export const selectCollectionsForPreview = createSelector(
//     [selectCollections],
//     collections => collections ? Object.keys(collections).map(key => collections[key]) : []
// )

// export const selectCollection = collectionUrlParam => 
//     createSelector(
//         [selectCollections],
//         collections => (collections ? collections[collectionUrlParam] : null)
//     )

// export const selectIsCollectionFetching = createSelector(
//     [selectTickets],
//     shop => shop.isFetching
// )

// export const selectIsCollectionsLoaded = createSelector(
//     [selectTickets],
//     shop => !!shop.collections
// )