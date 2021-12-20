const express = require('express')

const userRouter = require('./user')

const app =express()

app.use('/user',userRouter)

console.log('end');
module.exports = app 