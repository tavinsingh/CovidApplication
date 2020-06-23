var request = require("request");

var options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/report/country/name',
  qs: {'date-format': 'YYYY-MM-DD', format: 'json', date: '2020-04-01', name: 'United States Of America'},
  headers: {
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
    'x-rapidapi-key': 'a9e6f4bf49msh62b7508fc86ea21p1b8fa8jsnde25c251bc62',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
  exports.countryData = body;
});
