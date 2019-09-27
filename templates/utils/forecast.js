const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/33490b60af37e74b51cbc6de4ad24e9f/' + latitude + ',' + longitude + '?units=si'
    
    request({url, json: true}, (error, {  body  }) => {
        if (error) {
            callback('Unable to connect forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find the location.', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}


module.exports = forecast

