const axios = require('axios');
axios
  .get(
    'https://emailvalidation.abstractapi.com/v1/?api_key=5dcc169289bf4154821e8984b86c2c3&email=shubhampurwar35@gmail.com'
  )
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error, error.message, error.code, error.response.data, error.name, error.cause);
  });
