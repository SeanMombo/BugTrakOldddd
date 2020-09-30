import { createSelector } from 'reselect';
import { fetchTicketsStart } from './tickets.actions';


const selectTickets = state => state.tickets;



export const selectTicketsCollection= createSelector(
    [selectTickets],
    tickets => tickets.collections
)

export const selectTicketsForPreview = createSelector(
    [selectTicketsCollection],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectIsTicketsFetching = createSelector(
    [selectTickets],
    tickets => tickets.isFetching
)
// export const selectCollectionsForPreview = createSelector(
//     [selectCollections],
//     collections => collections ? Object.keys(collections).map(key => collections[key]) : []
// )

// export const selectCollection = collectionUrlParam => 
//     createSelector(
//         [selectCollections],
//         collections => (collections ? collections[collectionUrlParam] : null)
//     )



// export const selectIsCollectionsLoaded = createSelector(
//     [selectTickets],
//     shop => !!shop.collections
// )