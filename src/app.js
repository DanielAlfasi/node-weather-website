const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')



const app = express()
const port = process.env.PORT || 3000


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'Daniel Alfasi'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
    message: 'Help page is here',
    title: 'Help',
    name: 'Daniel Alfasi'
    })
 })

app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About me',
        name: 'Daniel Alfasi'
    })
 })

app.get('/weather', (req, res) => {
     if(!req.query.address){
         return res.send({
             error: 'Please provide an address'
         })
     } 
        geocode(req.query.address , (error, {latitude, longitude, location} = {}) => { //Makes sure that also if an error occurs the progam does not fail
            if(error) {
                return res.send({ error })
            }
    
           forecast(latitude, longitude, (error, forecastData) => {
              if(error)
              {
                return res.send({ error })
              }
             res.send({
                 forecastData: forecastData,
                 location,
                 address: req.query.address
                
             })
             
             
           })
       
         })
       

    
 }) 



app.get('/help/*', (req, res) => {
     res.render('404' , {
        title:'404',
        errormessage: 'Page article not found',
        name: 'Daniel Alfasi'
    })
 })  


app.get('*', (req, res) => {
    res.render('404' , {
        title:'404',
        errormessage: 'Page not found',
        name: 'Daniel Alfasi'
    })
}) 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})