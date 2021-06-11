// app.com
// app.com/help
// app.com/about

const path = require('path')
// Express is a function
const express = require('express')

// // To get the current directory and file name
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirPath = path.join(__dirname, '../public')

// Tellling express which templating engine we set up
// Handlebars for dynamic templating (No need of index.html)
// Put dynamic content in views folder, and static in public folder
// Remove index.html or index.hbs won't come into effect
// NOTE - hbs will look for folder views    
app.set('view engine', 'hbs') // Name of npm module hbs to create dynamic templates (Check views folder)

// Way to customize server.
// Passing a customized folder
// All the html files will be visible
// To access root localhost:3000
// To access about page localhost:3000/about.html
// static means assets do not change
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
        helpText: 'Visit this link'
    })
})

// What the server should do?
// Root of the server
// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// app.get('', (req, res) => {
//     res.send('<h1> Weather </h1>') // Sending HTML
// }) // This won't be called if app.use is valid 

// Help page
// app.get('/help', (req, res) => {
//     res.send('Help page!')
// })

// Not required if an html page is present in public directory
// and app.use is being used 
// app.get('/help', (req, res) => {
//     res.send({ // Sending JSON
//         name: 'Andrew',
//         age: 27
//     })
// })

// About page
// Not required if an html present in the public directory and app.use
// is being used
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// Weather page
app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Rainy',
        location: 'Ranchi'
    })
})

// Start the server up
// Only used one time
app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) // Port 3000
