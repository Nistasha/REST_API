const axios= require("axios");

//Define the url for the API request
const url = "https://api.github.com/users/github";

//Make the GET request
axios.get(url)
.then(response => {
    //print the response data
    console.log('Response Data:', response.data);
})
.catch(error => {
    //handle and print any errors
    console.error('Error making GET request:', error.message);
});
