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
  .then((json) => localStorage.setItem(KEY, json.token))
  .catch(() => { console.log('Erro'); });
