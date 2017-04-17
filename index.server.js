require('dotenv').config()
const app = require('express')(),
      {static} = require('express'),
      {json, urlencoded}=require('body-parser'),
      servicesRouter = require('./services'),
      mongoose = require('mongoose'),
      {connection} = require('mongoose'),
      cors = require('cors'),
      morgan = require('morgan'),
      passport = require('passport'),
      {mongoURI, port, stripeKey, host} = require('./config'),
      createStrategies = require('./strategies')


// DB config
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI)
connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', ()=> console.log(`connected to ${mongoURI}!`))


//mids
app.use(urlencoded({extended:true}))
app.use(json())
app.use(passport.initialize())
// console.log(createStrategies)
createStrategies()
app.use(static('uploads'))
app.use(morgan('tiny'))
app.use(cors())
app.use('/v1', servicesRouter)


app.listen(port, console.log(`http://${host}:${port}`))
