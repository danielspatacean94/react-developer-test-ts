import {
  configureStore,
  Action,
} from '@reduxjs/toolkit';
import thunk, {
  ThunkAction,
} from 'redux-thunk';
import {
  logger,
} from 'redux-logger';

import rootReducer, {
  RootState,
} from './reducers/rootReducer';

const store = configureStore({
  reducer:    rootReducer,
  middleware: [thunk, logger],
})

if(process.env.NODE_ENV === 'development') {
  // for hot-reloading the reducer during development, 
  // so we don't have to refresh the page to see the changes in the state.
  const newRootReducer = require('./reducers/rootReducer').default;
  store.replaceReducer(newRootReducer);
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk    = ThunkAction<void, RootState, null, Action<string>>;

export default store;
