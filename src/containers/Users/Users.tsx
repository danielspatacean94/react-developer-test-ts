import _ from 'lodash';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
} from 'react-redux';

import {
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@material-ui/core';

import {
  makeStyles,
} from '@material-ui/core/styles';

import {
  readUsers,
} from '../../actions/users';
import {
  formatDate,
} from '../../lib/utils';

import {RootState} from '../../store';

const useStyles = makeStyles(() => ({
  usersBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: '10px', // spacing between childs of 10px
    },
  },
  readError: {
    color: '#ff0000',
  },
}));

const headCells = [
  { id: 'timestamp', label: 'Timestamp'},
  { id: 'id',        label: 'ID'},
  { id: 'oldValue',  label: 'Old Value'},
  { id: 'newValue',  label: 'New Value'},
];

interface dataItem {
  timestamp: number;
  id: string;
  oldValue: string;
  newValue: string;
};

const Users : React.FC<any> = props => {
  const {dispatch, users} = props;
  const classes = useStyles();

  const [order,      setOrder]      = useState('desc');
  const [orderBy,    setOrderBy]    = useState('timestamp');
  const [dataSource, setDataSource] = useState<dataItem[]>([]);

  useEffect(() => {
    dispatch(readUsers());
  });

  useEffect(() => {
    const newData = _.map(users.data, (item: { timestamp: any; id: any; oldValue: any, newValue: any }) => ({
      timestamp: item.timestamp,
      id:        item.id,
      oldValue:  _.get(item, ['diff', 0, 'oldValue']),
      newValue:  _.get(item, ['diff', 0, 'newValue']),
    }));
    setDataSource(_.orderBy(newData, ['timestamp'], ['desc']));
  }, [users.data]);

  const fetchData = () => {
    dispatch(readUsers({refresh: true}));
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setDataSource(_.orderBy(dataSource, [property], [isAsc ? 'desc' : 'asc']));
  };

  const renderData = () => {
    if(dataSource && dataSource.length) {
      return (
        <Paper className='data-table'>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id}>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? 'desc' : 'asc'}
                      onClick={() => handleSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSource.map((row) => (
                <TableRow key={row.id}>
                <TableCell>{formatDate(row.timestamp, 'YYYY-MM-DD')}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.oldValue}</TableCell>
                  <TableCell>{row.newValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    };
  };

  const renderError = () => {
    if(users.readError) {
      return <Typography className={classes.readError}>{users.readError.error}</Typography>
    }
  }

  const renderActions = () => {
    if(users.reading) {
      return <CircularProgress />
    }

    return (
      <Button
        variant="contained"
        color="primary"
        onClick={fetchData}>
        {users.readError ? 'Retry' : 'Load more'}
      </Button>
    );
  }

  return (
    <Box className={classes.usersBox} data-testid="users-box" m={2}>
      {renderData()}
      {renderError()}
      {renderActions()}
    </Box>
  );
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
