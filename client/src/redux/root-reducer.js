import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'
import userDBReducer from './user-db/user-db.reducer'
import projectReducer from './projects/projects.reducer';
import ticketReducer from './tickets/tickets.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
    userdb: userDBReducer,
    project: projectReducer,
    tickets: ticketReducer
})

export default persistReducer(persistConfig, rootReducer);

