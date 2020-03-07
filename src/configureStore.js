import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import * as localForage from 'localforage';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import { authTokenMiddleware } from './middleware';
import { LOCAL_STORAGE_VERSION } from './config';

localForage.config({
  name: 'kelp',
  version: 1.0,
  storeName: 'kelp_store',
});

let composeEnhancers = compose;
const composeWithDevToolsExtension =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
if (
  process.env.NODE_ENV === 'development' &&
  typeof composeWithDevToolsExtension === 'function'
) {
  composeEnhancers = composeWithDevToolsExtension;
}

// set user blacklist
const saveSubsetBlacklistFilter = createBlacklistFilter('user', [
  'dotNotPersistor',
]);

// setting redux persisConfig
const persistConfig = {
  key: 'kelp',
  storage: localForage,
  transforms: [saveSubsetBlacklistFilter],
  version: LOCAL_STORAGE_VERSION,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [thunk, authTokenMiddleware];

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleWares))
);
const persistor = persistStore(store);

export { store, persistor };
