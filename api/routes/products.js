const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/products')

router.get('/',(req,res,next)=>{
  res.status(200).json({
    message: "Hello from get request"
  })
})

router.post('/',(req,res,next)=>{
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product
    .save()
    .then(result=>{
      console.log(result)
    })
    .catch(err=>{
      console.log(err)
    })
  res.status(201).json({
    message: "Handling post requests to /products",
    createdProduct: product
  })
})

router.get('/:productId',(req,res,next)=>{
  const id = req.params.productId
  res.status(200).json({
    message: `Yeahhhh it's a shitty product with id ${id}`
  })
})

router.patch('/:productId',(req,res,next)=>{
  const id = req.params.productId
  res.status(200).json({
    message: `Updated product ${id}`
  })
})

router.delete('/:productId',(req,res,next)=>{
  const id = req.params.productId
  res.status(200).json({
    message: `Just deleted shitty product with ${id}`
  })
})
module.exports = router