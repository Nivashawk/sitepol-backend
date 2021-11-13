const quality_time = (date1, date2) => {
    var timeDifference = new Date(date2 - date1);
    var diffInSeconds = Math.floor(timeDifference/1000);
    console.log("in milli seconds", diffInSeconds);
    return secondsToTime(diffInSeconds);
};

function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var difference = `${hours}:${minutes}:${seconds}`
    var parts = difference.split(/:/);
    var timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                       (parseInt(parts[1], 10) * 60 * 1000) + 
                       (parseInt(parts[2], 10) * 1000);
                       
    return Math.floor((timePeriodMillis/1000/60) << 0);
}

module.exports = quality_time;