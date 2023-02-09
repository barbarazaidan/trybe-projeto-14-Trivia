import { ADD_NAME, ADD_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME:
    return {
      name: action.payload.name,

    };
  case ADD_EMAIL:
    return {
      email: action.payload.email,
    };

  default:
    return state;
  }
};

export default player;
