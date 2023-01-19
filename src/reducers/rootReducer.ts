import {
  combineReducers,
} from '@reduxjs/toolkit'

import usersReducer    from '../reducers/users.slice';
import projectsReducer from '../reducers/projects.slice';

const rootReducer = combineReducers({
  users:    usersReducer,
  projects: projectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
