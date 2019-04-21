const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
  res.status(200).json({
    message: "Hello from order get request"
  })
})

router.post('/',(req,res,next)=>{
  res.status(201).json({
    message: "Hello from shitty order post request"
  })
})

router.get('/:orderId',(req,res,next)=>{
  const orderId = req.params.orderId
  const {name, id} = req.body
  res.status(200).json({
    message: "Yeahhhh it's a shitty order",
    orderId,
    name,
    id
  })
})

router.patch('/:orderId',(req,res,next)=>{
  const id = req.params.orderId
  res.status(200).json({
    message: "Updated the order",
    id
  })
})

router.delete('/:orderId',(req,res,next)=>{
  const id = req.params.orderId
  res.status(200).json({
    message: "Just deleted shitty order",
    id
  })
})
module.exports = router