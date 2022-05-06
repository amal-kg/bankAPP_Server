//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import user modal


const db = require('./db')

// database={
//     1000:{acno:1000,uname:"neer",password:1000,balance:5000,transaction:[]},
//     1001:{acno:1001,uname:"vyom",password:1001,balance:4000,transaction:[]},
//     1002:{acno:1002,uname:"laisha",password:1002,balance:3000,transaction:[]}

// }

//register definition
const register = (acno, password, uname) => {
  //asynchronous
  return db.User.findOne({ acno })
    .then(user => {
      console.log(user);
      if (user) {
        return {
          statusCode: 422,
          status: false,
          message: "user already exist,Please Login"
        }
      }
      else {
        const newUser = new db.User({
          acno,
          uname,
          password,
          balance: 0,
          transaction: []

        })
        newUser.save()
        return {
          statusCode: 200,
          status: true,
          message: "successully registered"
        }

      }
    })


}

//login definition
const login = (acno, password) => {

  //asynchronous
  return db.User.findOne({ acno, password }) // it means acno:acno, password:password
    .then(user => {
      if (user) {
        currentAcno = acno
        currentUname = user.uname

        //token generation
        const token = jwt.sign({ currentAcno: acno }, 'supersecretkey123')

        return {
          statusCode: 200,
          status: true,
          message: "successully log in",
          currentAcno,
          currentUname,
          token
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "incorrect password/Account Number"
        }

      }
    })

}
//deposit 

const deposit = (acno, password, amt) => {

  var amount = parseInt(amt)
  //asynchronous
  return db.User.findOne({ acno, password })
    .then(user => {
      if (user) {
        user.balance += amount
        user.transaction.push({
          amount: amount,
          type: "CREDIT"
        })
        user.save()

        return {
          statusCode: 200,
          status: true,
          message: "Amount successfully deposited And new balance is" + user.balance
        }
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "Incorrect password/Account number"
        }
      }

    })


}


//withdraw 

const withdraw = (req, acno, password, amt) => {

  var amount = parseInt(amt)
  var currentAcno = req.currentAcno
  //asynchrounus
  return db.User.findOne({ acno, password })
    .then(user => {
      if (user) {
        if (currentAcno != acno) {
          return {
            statusCode: 422,
            status: false,
            message: "operation denied"
          }
        }
        if (user.balance > amount) {
          user.balance -= amount
          user.transaction.push({
            amount: amount,
            type: "DEBIT"
          })
          user.save()
          return {
            statusCode: 200,
            status: true,
            message: "Amount successfully debited And new balance is" + user.balance
          }
        }
        else {
          return {
            statusCode: 422,
            status: false,
            message: "insufficent balance"
          }
        }

      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "incorrect password/Account Number"
        }
      }

    })
}

//transaction definition
const getTransaction = (acno) => {
  //asynchronous
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return {
        statusCode: 200,
        status: true,
        transaction: user.transaction
      }
    }
    else{
      return {
        statusCode: 422,
        status: false,
        message: "user doesn't exist"
      }
      

    }

  })
  if (acno in database) {
    return {
      statusCode: 200,
      status: true,
      transaction: database[acno]["transaction"]
    }
  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "user  doesn't exist"
    }

  }

}

//deleteAcc API
const deleteAcc = (acno)=>{
  //asynchronous
  return db.User.deleteOne({acno})
  .then(user=>{
    if(!user){
      return {
        statusCode: 422,
        status: false,
        message: "Operation Failed"
      }  
    }

    return{
      statusCode: 200,
      status: true,
      message:"The requested account number"+ acno + "deleted successfully"


    }
  })
}


module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
  

}
