export const GRAVATAR_INFO = 'GRAVATAR_INFO';
export const addInfo = (email, name, score) => ({
  type: 'GRAVATAR_INFO',
  // payload:
  email,
  name,
  score,
});

export const SCORE = 'SCORE';
export const score = () => ({
  type: 'SCORE',
});

export const ADD_SCORE = 'ADD_SCORE';
export const addScore = (scoreQuestion) => ({
  type: 'ADD_SCORE',
  payload: scoreQuestion,
});
