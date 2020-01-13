import axios from "axios";

let baseUrl = "http://localhost:3000/";
// let baseUrl = 'http://157.245.119.153:3002/'
// let baseUrl = 'http://lusencombustible.dyndns.org:3001'
function post(url, data) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: `${baseUrl}${url}`,
      data: data,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
}

function get(url) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${baseUrl}${url}`,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
}

function getIntegrations(url) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${url}`,
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
}

function deleteData(url, data) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: `${baseUrl}${url}`,
      data: data
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
}

function patchData(url, data) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "patch",
      url: `${baseUrl}${url}`,
      data: data
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
}

function putData(url, data) {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: `${baseUrl}${url}`,
      data: data,
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(msg => {
        resolve(msg);
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
}

function refreshToken() {
  var promise = new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "http://localhost:3000/auth/refresh",
      data: {
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("refresh_token")
      }
    })
      .then(msg => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.setItem("access_token", msg.data.access_token);
        localStorage.setItem("refresh_token", msg.data.refresh_token);
        resolve(1);
      })
      .catch(err => {
        reject(err)
      });
  });
  return promise;
}

export default {
  post,
  get,
  refreshToken,
  deleteData,
  putData,
  patchData,
  getIntegrations
};
