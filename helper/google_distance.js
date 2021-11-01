var axios = require("axios");



const route_distance = () => {
  var distance = require("google-distance");
  distance.apiKey = 'AIzaSyBeWksaQsbPVQ8czr379tVx6erIycLZmro';
  // const apikey = AIzaSyBeWksaQsbPVQ8czr379tVx6erIycLZmro
  // const origins = "13.137765339500627, 80.21890509760938"
  // const destinations = "13.13066431255493, 80.21388389842524"

  // var config = {
  //     method: 'get',
  //     url: `https://maps.googleapis.com/maps/api/distancematrix/json?${origins}&${destinations}&${apikey}`,
  //     headers: { }
  //   };

  //   axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //     return response.data
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     return error
  //   });

  distance.get(
    {
      origin: "San Francisco, CA",
      destination: "San Diego, CA",
    },
    function (err, data) {
      if (err) return console.log(err);
      console.log(data);
    }
  );
};

module.exports = route_distance;
