import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const encodePassword = (password) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(password),
    "secret key 123"
  ).toString();
};

const decodePassword = (password) => {
  var bytes = CryptoJS.AES.decrypt(password, "secret key 123");
  var decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedPass;
};

export const refreshToken = async () => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_API_BASE_URL,
  });
  const data = await instance.post("/auth/refresh");
  return data;
};
export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        refreshToken().then((data) => {
          const refreshUser = {
            ...user,
            accessToken: data.data.accessToken,
          };
          config.headers["token"] = "Bearer " + data.data.accessToken;
          dispatch(stateSuccess(refreshUser));
        });
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};

export { encodePassword, decodePassword };
