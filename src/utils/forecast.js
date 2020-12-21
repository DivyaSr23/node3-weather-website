const request = require('request')

const forecast = ((latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=903e26400825c394ccc55c93e9583c39&query=' + latitude +',' +longitude
    request ({ url,json:true},(error , {body}) => {
        if(error){
            callback('Unable to connect to weather services',undefined)
        }else if(body.location.error){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined, (body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
            )
        }

    })

})

module.exports = forecast