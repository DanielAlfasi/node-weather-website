const request = require('request')


const forecast = (latitude,longitude , callback) => {
    const url ='http://api.weatherstack.com/current?access_key=66aed99689e398988f257b2b48226ca2&query='+longitude+','+latitude
    request({url , json: true} , (error , {body} = {}) => {
        if(error) {
            callback('Unable to connect to weather services!' , undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another coordinates.' , undefined)
        } else {
            callback(undefined, {
                weatherdescription: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelstemp: body.current.feelslike
            })
        }
    
    })
}

module.exports = forecast