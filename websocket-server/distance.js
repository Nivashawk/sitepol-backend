// latitude and logitude distance calculation
const calculateDistance= (locationA, locationB) => {
    var R = 6371; // km
    var dLat = toRad(locationB[0] - locationA[0]);
    var dLon = toRad(locationB[1] - locationA[1]);
    var lat1 = toRad(locationA[0]);
    var lat2 = toRad(locationB[0]);
  
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return (Math.round(d * 100) / 100).toFixed(2);
  }
  
  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  module.exports = calculateDistance;