export const ADD_NAME = 'ADD_NAME';
export const addName = (name) => ({
  type: 'ADD_NAME',
  payload: name,
});

export const ADD_EMAIL = 'ADD_EMAIL';
export const addEmail = (email) => ({
  type: 'ADD_EMAIL',
  payload: email,
});

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const requestStarted = () => ({
  type: REQUEST_STARTED,
});

export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const requestSuccessful = (payload) => ({
  type: REQUEST_SUCCESSFUL,
  payload,
});

export const REQUEST_FAILED = 'REQUEST_FAILED';
export const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  payload: error,
});

export function thunkToken() {
  return async (dispatch) => {
    dispatch(requestStarted());
    try {
      const response = await getToken();
      dispatch(requestSuccessful(response));
    } catch (error) {
      dispatch(requestFailed(error));
    }
  };
}
