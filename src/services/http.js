import axios from 'axios';

axios.interceptors.response.use(
  (response) => {
    if (response.status >= 400 && response.status < 600) {
      return Promise.reject(response.data);
    }
    return response;
  },
  (error) => {
    if (error.message === 'Network Error') {
      return Promise.reject(error);
    }
    return error;
  },
);

const fetch = (method, url, timeout) => {
  const config = {
    url,
    method,
    crossDomain: true,
    cache: 'force-cache',
  };
  if (timeout) {
    config.timeout = timeout;
  }
  return axios.request(config);
};

const get = (url, timeout) => {
  return fetch('get', url, timeout);
};

const head = (url, timeout) => {
  return fetch('head', url, timeout);
};

export default { get, head };
