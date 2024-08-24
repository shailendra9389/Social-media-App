import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./userslice";
import tweetSlice from "./tweetslice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer=combineReducers({
    user:userSlice,
    tweet:tweetSlice
  })
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store=configureStore({
    reducer:
        //actions
        persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              },
            }),

    
})
export default store;