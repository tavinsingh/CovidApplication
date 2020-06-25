//Declaring varibles
const express = require('express')
const bp = require('body-parser')
const fs = require('fs')
const country = require('./index');
const { json, response } = require('express');

//Creating new instance of express
const app = express();
app.use(bp());
app.use(bp.urlencoded({extended: true})); //NOT SURE ABOUT THIS LINE

//Importing config file and grabbing port number
const configz = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const PORT = configz.PORT;

//Get call
app.get('/homepage', (request, response) => {
    //Testing purposes
    var countryDataToJSON = JSON.parse(country.countryData);
    response.status(200).send({countryDataToJSON}); //Shows all of the country's data
})

//Get call to grab province's data based on user's url
app.get('/findprovincedata/:province', (request, response) => {
    //Get province name
    const requestedProvince = request.params.province;
    var countryDataToJSON = JSON.parse(country.countryData);
    
    //Searching all provinces for requested province
    for(var i = 0; i < countryDataToJSON[0].provinces.length;++i) {
        if(countryDataToJSON[0].provinces[i].province.toLowerCase() == requestedProvince.toLowerCase()) {          
            var requestedProvinceInfo = countryDataToJSON[0].provinces[i];
        }
    }
    if(requestedProvinceInfo){response.status(200).send({requestedProvinceInfo});}
    else{response.status(500).send({message: "Could not find province!"})};
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