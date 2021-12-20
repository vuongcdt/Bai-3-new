console.log('start 123123');
const express = require('express')
const router = require('./router') 

const app =express()

const port = 3500

app.use('/',router)

app.get('/',(req, res)=>{
    res.send('start')
})

app.listen(port, () => {
    console.log(`app listen at http://localhost:${port}`);
})