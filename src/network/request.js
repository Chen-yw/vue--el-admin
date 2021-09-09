import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://39.105.78.155:50001/GetData",
    timeout: 5000,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );
  // 响应拦截器
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      // 全局错误提示
      if (err.response && err.response.data && err.response.data.errorCode) {
        Message.error(err.response.data.msg);
      }
      return Promise.reject(err);
    }
  );

  return instance(config);
}
