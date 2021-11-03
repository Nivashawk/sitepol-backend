const fs = require("fs");
const renderSvg = require("lottie-to-svg");

const animationData = JSON.parse(fs.readFileSync(`construction.json`, "utf8"));

renderSvg(animationData).then(svg => {
  fs.writeFileSync(`construction.svg`, svg, "utf8");
});