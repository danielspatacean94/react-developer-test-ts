import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  readProjects,
} from '../../reducers/projects.slice';
import {
  RootState,
} from '../../reducers/rootReducer';

import Entity from '../../components/Entity/Entity';

const Projects : React.FC<any> = props => {
  const dispatch = useDispatch();

  const { reading, readError, data } = useSelector(
    (state: RootState) => {
      return {
        reading:   state.projects.reading,
        readError: state.projects.readError,
        data:      state.projects.data,
      }
    },
  );

  useEffect(() => {
    dispatch<any>(readProjects());
  });

  const onLoadMore = () => dispatch<any>(readProjects({refresh: true}));

  return <Entity data={data} reading={reading} onLoadMore={onLoadMore} error={readError} />
};



export default Projects;
