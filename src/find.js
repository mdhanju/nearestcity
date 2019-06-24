const locations = require("./address.json");

function __deg2Rad(deg) {
    return (deg * Math.PI) / 180;
}

function _pythagorasEquiRectangular(lat1, lng1, lat2, lng2) {
    lat1 = __deg2Rad(lat1);
    lat2 = __deg2Rad(lat2);
    lng1 = __deg2Rad(lng1);
    lng2 = __deg2Rad(lng2);
    // let R = 6371; // km
    const R = 3956; // Miles
    const x = (lng2 - lng1) * Math.cos((lat1 + lat2) / 2);
    const y = lat2 - lat1;
    const d = Math.sqrt(x * x + y * y) * R;
    return d;
}

function __toRad(deg) {
    return (deg * Math.PI) / 180;
}
function __toDeg(rad) {
    return (rad * 180) / Math.PI;
}

function _getBearing(lat1, lng1, lat2, lng2) {
    let dLon = lng2 - lng1;
    let y = Math.sin(dLon) * Math.cos(lat2);
    let x =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let brng = __toDeg(Math.atan2(y, x));
    return 360 - ((brng + 360) % 360);
}

function _degToCompass(deg) {
    if (deg >= 11.25 && deg < 33.75) {
        return "NNE";
    } else if (deg >= 33.75 && deg < 56.25) {
        return "NE";
    } else if (deg >= 56.25 && deg < 78.75) {
        return "ENE";
    } else if (deg >= 78.75 && deg < 101.25) {
        return "E";
    } else if (deg >= 101.25 && deg < 123.75) {
        return "ESE";
    } else if (deg >= 123.75 && deg < 146.25) {
        return "SE";
    } else if (deg >= 146.25 && deg < 168.75) {
        return "SSE";
    } else if (deg >= 168.75 && deg < 191.25) {
        return "S";
    } else if (deg >= 191.25 && deg < 213.75) {
        return "SSW";
    } else if (deg >= 213.75 && deg < 236.25) {
        return "SW";
    } else if (deg >= 236.25 && deg < 258.75) {
        return "WSW";
    } else if (deg >= 258.75 && deg < 281.25) {
        return "W";
    } else if (deg >= 281.25 && deg < 303.75) {
        return "WNW";
    } else if (deg >= 303.75 && deg < 326.25) {
        return "NW";
    } else {
        return "N";
    }
}

function findNearest(lat, lng) {
    console.log(`START - ${Date.now()}`);
    let mindif = 99999;
    let _closest;
    let distance;

    for (let i = 0; i < locations.length; i++) {
        const location = locations[i] || {};
        const dif = _pythagorasEquiRectangular(
            lat,
            lng,
            location.lat,
            location.lng
        );
        if (dif < mindif) {
            _closest = i;
            mindif = dif;
            distance = dif;
        }
    }
    const address = locations[_closest];

    const bearing = _getBearing(lat, lng, address.lat, address.lng);
    const direction = _degToCompass(bearing);

    console.log(`END - ${Date.now()}`);

    return {
        distance,
        address,
        bearing,
        direction
    };
}

module.exports = findNearest;
