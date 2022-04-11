import axios from "axios";
import { refreshToken } from "../redux/slice/UserSlice";
import jwt_decode from "jwt-decode";
import store from "../redux/store/store";

// Custome axios for user
const axiosUser = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default axiosUser;

axiosUser.interceptors.request.use(
  async (config) => {
    const userStore = store.getState()?.user?.user;
    // console.log(userStore);
    let currentTime = new Date().getTime();

    if (userStore?.accessToken) {
      const decodeToken = jwt_decode(userStore?.accessToken);
      if (decodeToken.exp * 1000 < currentTime) {
        const newUserStore = await store.dispatch(refreshToken());
        // console.log(newUserStore);
        if (newUserStore && config?.headers) {
          config.headers["authorization"] =
            "Bearer " + newUserStore?.payload.accessToken;
          // console.log("Bearer " + newUserStore?.payload.accessToken);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Custome axios for get data
export const axiosGetData = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const linkAvtPost = "http://localhost:8000/images/post/avatar/";

export const linkAvt = "http://localhost:8000/images/avatar/";
