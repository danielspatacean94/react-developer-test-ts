import {Reducer} from 'redux';

const initialState = {
  data:      null,
  reading:   false,
  readError: null,
};

interface State {
  data: any;
  reading: boolean;
  readError: any;
}

type Action = {type: string, [key: string]: any};

const reducer: Reducer<State, Action> = (store = initialState, action: Action) => {
  switch(action.type) {
    // ------------------------------------ read ------------------------------------
    case 'USERS_READ_REQUEST':
      return {
        ...store,
        reading:     true,
        readError:   null,
      };

    case 'USERS_READ_SUCCESS':
      return {
        ...store,
        reading:    false,
        readError:  null,
        data:       action.data,
      };

    case 'USERS_READ_FAILURE':
      return {
        ...store,
        reading:   false,
        readError: action.error,
      };

    // ------------------------------------ create ------------------------------------
    // ------------------------------------ delete ------------------------------------
    // ------------------------------------ update ------------------------------------
    default:
      return store;
  }
};

export default reducer;