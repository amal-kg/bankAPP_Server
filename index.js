//import express
const express = require('express')
const res = require('express/lib/response')

const dataService = require('./services/data.services')

//define /import jwt library here
const jwt = require('jsonwebtoken')

//import cors
const cors = require('cors')

//create an app using express
const app = express()

//use cors to specify origin
app.use(cors({
  origin:'http://localhost:4200'
}))

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

//application specific middleware
const appMiddleware = (req,res,next)=>{
  console.log("Application specific middleware")//ith mathram kodutha processing mathre kaniku next onnum nadakilla so ith kazinj next function kodukanam
  next()
}

app.use(appMiddleware)


//to verify token - middleware
const jwtMiddleware = (req,res,next)=>{
  try{
    const token = req.headers["x-access-token"] 
      //verify token
  const data = jwt.verify(token,'supersecretkey123')
  req.currentAcno = data.currentAcno
  next()
  }

  catch{
    res.status(422).json({
      statusCode : 422,
      status :false, 
      message:"please log in"
    })
  }


}

//bank app -APIs:
//register API
app.post('/register',(req,res)=>{
  dataService.register(req.body.acno,req.body.password,req.body.uname)
  //asynchronous
  .then(result=>{
    res.status(result.statusCode).json(result)
  })
  
  

}) 


//login API 
app.post('/login',(req,res)=>{
    dataService.login(req.body.acno,req.body.password)
    //asynchronous
    .then(result=>{
      res.status(result.statusCode).json(result) 

    })
  
  })

//deposit API
app.post('/deposit',jwtMiddleware,(req,res)=>{

  dataService.deposit(req.body.acno,req.body.password,req.body.amt)
  .then(result => {
    res.status(result.statusCode).json(result)
    })   
  })

  //withdraw API
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    dataService.withdraw(req,req.body.acno,req.body.password,req.body.amt)
    .then(result => {
      res.status(result.statusCode).json(result)
      })   
  })

    //transction API
    app.post('/transaction',jwtMiddleware,(req,res)=>{
        dataService.getTransaction(req.body.acno)
        .then(result => {
          res.status(result.statusCode).json(result)
          })   
          
      })
    
//delete API
app.delete('/deleteAcc/:acno',jwtMiddleware,(req,res)=>{
  dataService.deleteAcc(req.params.acno)
  .then(result => {
    res.status(result.statusCode).json(result)
    })   


})






//set up the port number
app.listen(3000,()=>{
    console.log("server started at port no:3000");
})