const { e } = require("mathjs");

function addCommas(value) {
    const valasInt = parseInt(value)
    if (valasInt > 999 || valasInt < -999){
        return value.toLocaleString();

    } else {
        return value.toString();
    }
}

module.exports = addCommas;