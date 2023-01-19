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

interface ProjectsState {
  data: any;
  reading: boolean;
  readError: string | null;
};

const initialState: ProjectsState = {
  data: null,
  reading: false,
  readError: null,
};

const projects = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    readStart(state) {
      state.reading = true;
      state.readError = null;
    },
    readSuccess(state, action: PayloadAction<Entity[]>) {
      state.data = action.payload;
      state.reading = false;
      state.readError = null;
    },
    readFailure(state, action: PayloadAction<string>) {
      state.reading = false
      state.readError = action.payload;
    }
  }
});

const {
  readStart,
  readSuccess,
  readFailure,
} = projects.actions;

const shouldFetch = (options: any, store: ProjectsState) => {
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

export default projects.reducer;

export const readProjects = (options: any = {}): AppThunk => async(dispatch, getStore) => {
  const {projects} = getStore();
  if(shouldFetch(options, projects)) {
    try {
      dispatch(readStart())
  
      const result = await api.getProjectsDiff();
  
      dispatch(readSuccess(result.data));
    } catch (err: any) {
      dispatch(readFailure(err.message));
    }
  }
};
