import { GRAVATAR_INFO, SCORE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case ADD_NAME:
  //   return {
  //     name: action.name,

  //   };
  // case ADD_EMAIL:
  //   return {
  //     email: action.email,
  //   };

  case GRAVATAR_INFO:
    return {
      name: action.name,
      gravatarEmail: action.email,
      score: action.score,
    };

  case SCORE:
    return {
      score: action.score,
    };

  default:
    return state;
  }
};

export default player;
