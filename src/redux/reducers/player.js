import { GRAVATAR_INFO, SCORE, ADD_SCORE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
    };

  default:
    return state;
  }
};

export default player;
