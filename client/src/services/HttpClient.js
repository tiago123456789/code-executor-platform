import axios from "axios"


axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.status === 403 || error.response.status === 401) {  
        localStorage.removeItem("accessToken")
        window.location.href = "/" 
    }

    return Promise.reject(error);
});

export default axios;