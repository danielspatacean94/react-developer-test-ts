import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  readUsers,
} from '../../reducers/users.slice';
import {
  RootState,
 } from '../../reducers/rootReducer';

import Entity from '../../components/Entity/Entity';

const Users : React.FC<any> = props => {
  const dispatch = useDispatch();

  const { reading, readError, data } = useSelector(
    (state: RootState) => {
      return {
        reading:   state.users.reading,
        readError: state.users.readError,
        data:      state.users.data,
      }
    },
  );

  useEffect(() => {
    dispatch<any>(readUsers());
  });

  const onLoadMore = () => dispatch<any>(readUsers({refresh: true}));

  return <Entity data={data} reading={reading} onLoadMore={onLoadMore} error={readError} />
};

export default Users;
