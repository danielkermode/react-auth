import { browserHistory } from 'react-router';

const initialState = {
  user: null,
  error: null
};

export const SESSION_ERROR = 'session/SESSION_ERROR';
export const register = (username, password) => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ username, password })
  };

  return dispatch => {
    fetch('/user', options)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        if(res.id) {
          return dispatch(login(username, password));
        } else {
          throw new Error('User not registered correctly.');
        }
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          err,
          type: SESSION_ERROR
        });
      });
  };
};

export const GET_USER_SUCCESS = 'session/GET_USER_SUCCESS';
export const login = (username, password) => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ username, password }),
    credentials: 'same-origin'
  };

  return dispatch => {
    fetch('/login', options)
      .then(res => {
        return res.json();
      })
      .then(user => {
        console.log(user);
        if(user.id) {
          browserHistory.push('/profile/' + user.id);
          return dispatch({
            user,
            type: GET_USER_SUCCESS
          });
        } else {
          throw new Error('User not logged in correctly.');
        }
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          err,
          type: SESSION_ERROR
        });
      });
  };
};

export const getUser = (id) => {
  const options = {
    credentials: 'same-origin'
  };

  return dispatch => {
    fetch('/user/' + id, options)
      .then(res => {
        if(res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(user => {
        console.log(user);
        return dispatch({
          user,
          type: GET_USER_SUCCESS
        });
      })
      .catch(err => {
        console.log(err.message);
        return dispatch({
          err,
          type: SESSION_ERROR
        });
      });
  };
};

/* reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case SESSION_ERROR:
      return {
        ...state,
        error: action.err
      };
    default:
      return state;
  }
};

export default reducer;