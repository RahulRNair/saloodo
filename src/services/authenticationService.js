
const axios = require('axios');
export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = 'http://localhost:8080/api/login';
  const token = localStorage.getItem('token');
  var config = {
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    }
  };
  var bodyParameters = JSON.stringify(request);
  return new Promise((resolve, reject) => {
    axios.post(LOGIN_API_ENDPOINT,bodyParameters, config)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (err) {
      console.log("Success Response for auth", err)
      reject(err);
    });
  })
};

export const getData = (request) => {

  const ORDERS_API_ENDPOINT = 'http://localhost:8080/api/orders';

  const token = localStorage.getItem('token');
  var config = {
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    }
  };


  return new Promise((resolve, reject) => {
    axios.get(ORDERS_API_ENDPOINT,config)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response.data);
    });
  })


};


export const updateData = (request) => {
  const UPDATEORDERS_API_ENDPOINT = 'http://localhost:8080/api/updateorders';

  const token = localStorage.getItem('token');
  var config = {
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    }
  };
  var bodyParameters = JSON.stringify(request);
  return new Promise((resolve, reject) => {
    axios.post(UPDATEORDERS_API_ENDPOINT,bodyParameters, config)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response.data);
    });
  })
};

export const getUsers = (request) => {

  const USERS_API_ENDPOINT = 'http://localhost:8080/api/users';

  const token = localStorage.getItem('token');
  var config = {
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    }
  };


  return new Promise((resolve, reject) => {
    axios.get(USERS_API_ENDPOINT,config)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (response) {
      reject(response.data);
    });
  })


};
