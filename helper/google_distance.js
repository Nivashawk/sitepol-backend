const db = require("../model");
const TRACK_SITE_ENGINEER = db.track_siteEngineer;

var distance = require("google-distance");
var KEY = "AIzaSyCkfdPSxugtDgQRfYhVvv_TmLnCVQrESbo";

const route_distance = (user, latitude1, longitude2, latitude3, longitude4) => {
  distance.apiKey = KEY;
  distance.get(
    {
      origin: `${latitude1},${longitude2}`,
      destination: `${latitude3},${longitude4}`,
      mode: "driving",
    },
    function (err, data) {
      if (err) {
        response = err;
        console.log(response);
        return response;
      } else {
        google_distance = data["distanceValue"];
        updatedistanceTravelled(user)
      }
    }
  );
};

const updatedistanceTravelled = async (user) => {
  const today = new Date().toISOString().split("T")[0];
  console.log("date", today);
  var data = await TRACK_SITE_ENGINEER.findOne({
    where: { user_id: user, date: today },
    attributes: ["total_distance_travelled"],
  });
  console.log("getdistance", data["total_distance_travelled"]);
  if(data["total_distance_travelled"] !== null || data["total_distance_travelled"] !== undefined)
  {
    var total_distance_travelled = data["total_distance_travelled"] + google_distance
    await TRACK_SITE_ENGINEER.update(
      { total_distance_travelled: total_distance_travelled },
      { where: { user_id: user, date: today } }
  );
  }
     
}



module.exports = route_distance;
