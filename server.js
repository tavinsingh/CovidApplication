//Declaring varibles
const express = require('express')
const bp = require('body-parser')
const fs = require('fs')
const allCountries = require('./index');

//Creating new instance of express
const app = express();
app.use(bp());
app.use(bp.urlencoded({extended: true})); //NOT SURE ABOUT THIS LINE

//Importing config file and grabbing port number
const configz = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const PORT = configz.PORT;

//Get call
app.get('/homepage', (request, response) => {
    response.status(200).send({allCountries}); //Shows all of the country's data
    //Testing purposes
    var obj = allCountries.countryData[3];
    console.log(obj);
})

//Post call using body
app.post('/findcountry', (request, response) => {
    
    if (request.body) {
        console.log(`request recieved, printing params now...`);
        console.log('Body is: ', request.body);
        response.status(200).send({message: 'Good job...request recieved'});
    }
    else
    response.status(500).send({message: 'Your body is empty'});
})

//Post call using url
app.post('/findcountrybyid/:countryId', (request, response) => {
    var testId = request.params.countryId;
    console.log(testId);
    response.status(200).send(testId);
})


//Turning on server
app.listen(PORT, () => console.log(`Server is running at part ${PORT}`));