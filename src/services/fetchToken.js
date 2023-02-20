// const getToken = async () => {
//   const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
//   const response = await fetch(ENDPOINT);
//   const json = await response.json();

//   return response.ok ? Promise.resolve(json) : Promise.reject(json);
// };
// export default getToken;

const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
export const KEY = 'token';

export const getToken = () => fetch(TOKEN_URL).then((response) => response.json())
  .then((data) => localStorage.setItem(KEY, data.token))
  .catch(() => { console.log('Erro'); });

export const getTriviaQuestions = async () => {
  const token = localStorage.getItem(KEY);
  // console.log(token);
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  // if (token) {
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  // }
};
