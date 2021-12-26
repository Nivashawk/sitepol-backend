const IST = () => {
  d = new Date();
  utc = d.getTime() + d.getTimezoneOffset() * 60000;
  nd = new Date(utc + 3600000 * +5.5);
  var ist = nd.toLocaleString().split(",")[0];
  console.log("IST now is : " + ist);
  return ist
};

module.exports = IST;
