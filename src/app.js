// NOTE - THIS FILE IS RUNNING ON MY MACHINE

const path = require('path')
// Express is a function
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')

const app = express()

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Path to .html and .hbs
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Configuring handlebars and views location
app.set('view engine', 'hbs') // Name of npm module hbs to create dynamic templates (Check views folder)
app.set('views', viewsPath) // Creating custom directory for hbs files.

// Registering partials.
// Partials are used for making semi templates i.e a semi html file which can be used in other html files.
// For eg: Header and footer should be constant in all the html pages
// Need to run nodemon src/app.js -e js,hbs
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// Rendering dynamic content using hbs
// index is index.hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shirshak Sengupta'
    }) // Passing value to index.hbs
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shirshak Sengupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Shirshak Sengupta',
        helpText: 'Visit this link'
    })
})

// Weather page
app.get('/weather', (req, res) => {
    
    // http://localhost:3000/weather?address=Philadelphia
    if (!req.query.address) {
        return res.send({ // Can send only one send per query
                    error: 'You must provide an address!'
                })
    }
    
    // Chaining of callbacks
    geocode.getGeocode(req.query.address, (error, data) => { 
        if (error) {
            return res.send({
                error: error,
                from: 'Geocode App'
            })
        } 
        forecast.getForecast(data, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error,
                    from: 'WeatherStack App'
                })
            }
            const {location} = data
            // console.log('Location', location)
            // console.log('Data', forecastData)

            res.send({
                address: req.query.address,
                location: location,
                forecast: 'Weather is ' + forecastData.weatherDescription +': temperature is ' + forecastData.temp + ' but it feels like '
                        + forecastData.feelsLike
            })
        })
    })
})

// How to use req 
// app.get('/products', (req, res) => {

//     // http://localhost:3000/products?search=games&rating=4
//     // console.log(req.query)
//     // console.log(req.query.rating)
//     // console.log(req.query.search)

//     if (!req.query.search) {
//         return res.send({ // Can send only one send per query
//                     error: 'You must provide a search term'
//                 })
//     } 
//     res.send({
//         products: []
//     })
    
// })

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        name:'Shirshak Sengupta',
        errorMessage: 'Help article not found!'
    })
})

// Sending 404 - Page not available
// Match anything that hasn't been matched yet
// Need to come last
app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name:'Shirshak Sengupta',
        errorMessage: 'Error 404 - Page not found'
    })
})

// Start the server up
// Only used one time
app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) // Port 3000
