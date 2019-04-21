const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

mongoose.connect(
    `mongodb+srv://Robyrogers:${process.env.MONGO_ATLAS_PW}@restful-api-node-js-raqxh.mongodb.net/test?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .catch(err=>{
    console.log(err.message)
  })

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use((req,res,next)=>{
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Origin','*')
  
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'Put, Post, Patch, Delete, Get')
    return res.status(200).json({})
  }
  next()
})

app.use('/products',productRoutes)
app.use('/orders',orderRoutes)

app.use((req,res,next)=>{
  const error = new Error('What the f*** you do')
  error.status = 404
  next(error)
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500)
  res.json({
    error:{
      message: error.message
    }
  })
})

module.exports = app