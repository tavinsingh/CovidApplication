//Declaring varibles
const express = require('express')
const bp = require('body-parser')
const fs = require('fs')
const countryData = require('./index');

//Creating new instance of express
const app = express();
app.use(bp.urlencoded({extended: false})); //NOT SURE ABOUT THIS LINE
app.use(bp())

//Importing config file and grabbing port number
const configz = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
const PORT = configz.PORT;

//Get call
app.get('/homepage', (request, response) => {
    response.status(200).send({countryData})
    console.log(countryData);
})

//

//Turning on server
app.listen(PORT, () => console.log(`Server is running at part ${PORT}`))