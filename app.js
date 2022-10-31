const express = require('express')
const https = require('https')
const app = express()

app.use(express.urlencoded({
    extended: true
  }))

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/", function (req, res) { 
    const query = req.body.cityName
    const apiKey = process.env.apiKey
    const unit ='metric'
    
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
    https.get(URL, function(response){
        console.log(response.statusCode);
    
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const iconID = weatherData.weather[0].icon
            const imageURL = `http://openweathermap.org/img/wn/${iconID}@2x.png`
            res.write("<h1> The weather is currently "+ weatherDescription+".</h1>")
            res.write("<h2> The temperatura in "+ query + " is "+ temp + " degrees Celsius.</h2>")
            res.write(`<img src="${imageURL}" alt="">`)
            res.send()
        })
    })
})

app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})

