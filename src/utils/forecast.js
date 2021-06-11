const request = require('request')

const forecast = ({latitude, longitude} = {}, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=f24260c3a28d122ceba4b332802e4116&query='+latitude+','+longitude+'&units=m'

    request({url, json: true}, (error, {body}) => {

        if (error) { // Lower layer stack error of the system like port issue or wifi not present
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) { // Error thrown by the website will be logged in response
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                weatherDescription: body.current.weather_descriptions,
                temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                time: body.current.observation_time
            })
        }
    })
}

module.exports = {
    getForecast: forecast
}