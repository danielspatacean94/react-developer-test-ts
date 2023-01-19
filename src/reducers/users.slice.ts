import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import api, {
  Entity,
} from '../lib/api';
import {
  AppThunk,
} from '../store';

interface UsersState {
  data: any;
  reading: boolean;
  readError: string | null;
};

const initialState: UsersState = {
  data: null,
  reading: false,
  readError: null,
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    readStart(state) {
      state.reading = true;
      state.readError = null;
    },
    readSuccess(state, action: PayloadAction<Entity[]>) {
      const data = action.payload;
      state.data = data;
      state.reading = false;
      state.readError = null;
    },
    readFailure(state, action: PayloadAction<string>) {
      state.reading = false
      state.readError = action.payload;
    }
  }
})

const {
  readStart,
  readSuccess,
  readFailure,
} = users.actions;

const shouldFetch = (options: any, store: UsersState) => {
  if(options.refresh) {
    return true;
  }
  if(store.reading) {
    return false;
  }
  if(store.data) {
    return false;
  }
  if(store.readError) {
    return false;
  }

  return true;
};

export default users.reducer;

export const readUsers = (options: any = {}): AppThunk => async(dispatch, getState) => {
  const {users} = getState();

  if(shouldFetch(options, users)) {
    try {
      dispatch(readStart());
  
      const users = await api.getUsersDiff();
  
      dispatch(readSuccess(users.data));
    } catch (err: any) {
      console.log(`Got error`, err);
      dispatch(readFailure(err.message));
    }
  }
};
