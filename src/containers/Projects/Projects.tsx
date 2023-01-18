import React, {
  useEffect,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  readProjects,
} from '../../actions/projects';

import Entity      from '../../components/Entity/Entity';
import {RootState} from '../../store';

const Projects : React.FC<any> = props => {
  const {dispatch, projects} = props;

  useEffect(() => {
    dispatch(readProjects());
  });

  const onLoadMore = () => dispatch(readProjects({refresh: true}));

  return <Entity data={projects.data} reading={projects.reading} onLoadMore={onLoadMore} error={projects.readError} />
};

const mapStateToProps = (state: RootState) => {
  const {
    projects,
  } = state;

  return {
    projects,
  };
};

export default connect(mapStateToProps)(Projects);
