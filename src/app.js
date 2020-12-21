const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath =  path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewPath  )
hbs.registerPartials(partialPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req,res) => {
    res.render('index',{
        title: 'Weather App' ,
        name: 'Divya'
    })
})

app.get('/about' , (req,res) => {
    res.render('about',{
        title :'About Me',
        name: 'Divya'
    })
})

app.get('/help' , (req,res) => {
    res.render('help',{
        title: 'Help',
        name:'Divya',
        helpText: 'This is some helpful text.'
    })
})


app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address , (error , {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
              return res.send({error})
            }
       res.send({
           forecast:forecastData,
           location,
           address:req.query.address
       })
      })
    })


    // res.send({
    //     forecast: 50,
    //     location: 'vizag',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res )=>{
    if(!req.query.search){
        res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[],
    })

})

app.get('/help/*',(req , res) =>{
    res.render('404',{
        errorMessage: 'Home article not found',
        title:'404',
        name:'Divya'
    })
})

app.get('*', (req , res) =>{
   res.render('404',{
       errorMessage: 'Page not found',
       title:'404',
       name:'Divya'
   })
})

app.listen(port, () =>{
    console.log('Server is up on port' + port)
})