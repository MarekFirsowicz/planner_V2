import axios from "axios";




export const axiosPrivate = axios.create({
  headers:{'Content-type': 'application/json'}
});

axiosPrivate.interceptors.request.use(

  config => {
    const user = JSON.parse(localStorage.getItem('user')) || null
    config.headers['authorization'] = `Bearer ${user.token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



axiosPrivate.interceptors.response.use(
  response => response,
  async (error) => {
    //console.log(error?.response?.status)
    if (error?.response?.status === 401) {
      //console.log('401')
      window.location.href = "/login";
      localStorage.removeItem('user')
    }
    return Promise.reject(error)
  });


