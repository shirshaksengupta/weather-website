const request = require('request')

// This function will communicate with mapbox to get lat/lon
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hpcnNoYWsiLCJhIjoiY2twZmJkbGhkMjV2OTJvbnhrNHd5NDkzMCJ9.pS580n8Jvd0dJKg5O5K9kA&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) { // Lower layer stack error of the system like port issue or wifi not present
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) { // Error thrown by the website will be logged in response
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
})
}

module.exports = {
    getGeocode: geocode
}