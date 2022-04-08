//import express
const express = require('express')

const dataService = require('./services/data.services')

//create an app using express
const app = express()

//to parse json
app.use(express.json())


//GET -to read data
app.get('/',(req,res)=>{
    res.send("its a GET METHOD")
})

//POST -to create data
app.post('/',(req,res)=>{
    res.status(401).send("its post method")
})

//PUT -to update/modify data
app.put('/',(req,res)=>{
    res.send("its put method")
})

//PATCH -to create data
app.patch('/',(req,res)=>{
    res.send("its patch method")
})

//DELETE -to create data
app.delete('/',(req,res)=>{
    res.send("its delete method")
})

//bank app -API
//register API
app.post('/register',(req,res)=>{
  const result =  dataService.register(req.body.acno,req.body.password,req.body.uname)
  res.status(result.statusCode).json(result)

})


//login API
app.post('/login',(req,res)=>{
    const result =  dataService.login(req.body.acno,req.body.password)
    res.status(result.statusCode).json(result)
  
  })

//deposit API
app.post('/deposit',(req,res)=>{
    const result =  dataService.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
  
  })

  





//set up the port number
app.listen(3000,()=>{
    console.log("server started at port no:3000");
})