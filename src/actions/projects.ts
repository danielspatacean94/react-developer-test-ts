import api from '../lib/api';

import {State} from '../reducers/projects';

import {AppDispatch} from '../store';

const shouldFetch = (options: any, store: State) => {
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

export const readProjects = (options = {}) => async(dispatch: AppDispatch, getStore: Function) => {
  const {projects} = getStore();

  if(!shouldFetch(options, projects)) {
    return;
  }

  dispatch({type: 'PROJECTS_READ_REQUEST'});

  try {
    const response = await api.getProjectsDiff();

    if(response) {
      dispatch({
        type: 'PROJECTS_READ_SUCCESS',
        data: response.data,
      });
    }
  } catch(err) {
    dispatch({
      type: 'PROJECTS_READ_FAILURE',
      error: err,
    });
  }
};