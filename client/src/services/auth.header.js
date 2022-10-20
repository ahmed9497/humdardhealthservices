import aes256 from "aes256";
const KEY = process.env.REACT_APP_HASH_KEY;

let cipher = aes256.createCipher(KEY);


export default function authHeader() {

  const serializedState = localStorage.getItem('auth');
  if (!serializedState) return undefined;
  let decrypted = cipher.decrypt(serializedState);

  let data = JSON.parse(decodeURIComponent(escape(atob(decrypted))));

  const auth = data;

  const token = auth?.user?.data?.token;

  const timeStamp = new Date().getTime();
  const userId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );

  let logTokken = timeStamp + "?" + userId;

  let headers = {
    'log-token': logTokken,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',

  };

  if (auth && token) {
    return { ...headers, 'x-access-token': `${token}` };
  } else {
    return headers;
  }

}