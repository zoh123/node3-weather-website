const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, './templates/views')
const partialPath = path.join(__dirname, './templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Leo',
        footer: 'Created by Leo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Not a valid address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me', 
        name: 'Leo',
        footer: 'Created by Leo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a message',
        title: 'Help',
        name: 'Leo',
        footer: 'Created by Leo'
    })
})

app.get('/help/*', (req, res) => {
    // or you can do it this way...
    res.render('help404', {
        title: '404 Help',
        name: 'Created by Leo',
        errorMessage: 'Help article not found.',
        footer: 'Footer for help/*404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Created by Leo',
        errorMessage: 'Page not found.',
        footer: 'Footer for 404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})