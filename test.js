const nearest = require("./index");
const cords = {
    lat: 37.7645993,
    lng: -121.5565288
};

const response = nearest(cords.lat, cords.lng);
const { distance, address: { city, state_id } = {}, direction } = response;
const formatedDistance = Math.round(distance);
// console.log("response ::::: ", response);
//
// // console.log("distance ::::: ", Math.round(distance));
// console.log("city ::::: ", city);
// console.log("state_id ::::: ", state_id);
// console.log("direction ::::: ", direction);

const foramtedResult = `${formatedDistance} Miles ${direction} ${city}, ${state_id}`;

console.log(foramtedResult);
