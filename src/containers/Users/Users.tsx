import React, {
  useEffect,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  readUsers,
} from '../../actions/users';

import Entity      from '../../components/Entity/Entity';
import {RootState} from '../../store';

const Users : React.FC<any> = props => {
  const {dispatch, users} = props;

  useEffect(() => {
    dispatch(readUsers());
  });

  const onLoadMore = () => dispatch(readUsers({refresh: true}));

  return <Entity data={users.data} reading={users.reading} onLoadMore={onLoadMore} error={users.readError} />
};

const mapStateToProps = (state: RootState) => {
  const {
    users,
  } = state;

  return {
    users,
  };
};

export default connect(mapStateToProps)(Users);
