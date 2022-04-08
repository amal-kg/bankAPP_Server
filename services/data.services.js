database={
    1000:{acno:1000,uname:"neer",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"vyom",password:1001,balance:4000,transaction:[]},
    1002:{acno:1002,uname:"laisha",password:1002,balance:3000,transaction:[]}

}

//register definition
const register = (acno,pswd,uname)=>{


    if(acno in database){
      return {
          statusCode:422,
          status:false,
          message:"user already exist,Please Login"
      }
    }
    else{
      database[acno]={
        acno,
        uname,
        password:pswd,
        balance:0,
        transaction:[]
        
      }
      console.log(database)
      return {
        statusCode:422,
        status:true,
        message:"successully registered"
    }
    }

  }

  //login definition
  const login = (acno,pswd)=>{
    if(acno in database){
      if(pswd == database[acno]["password"]){

       currentAcno= acno

       currentUname = database[acno]["uname"]

       return {
        statusCode:200,
        status:true,
        message:"successully log in",
        currentAcno,
        currentUname
    }

      }
      else{
        return {
            statusCode:422,
            status:false,
            message:"incorrect password"
        }
    
    }
    }
    else{
     return {
        statusCode:422,
        status:false,
        message:"Account No doesn't exist"
    }
    }
  }


    //deposit 

    const deposit=(acno,password,amt)=>{

        var amount = parseInt(amt)
    
    
        if(acno in database){
          
          if(password == database[acno]["password"]){
            database[acno]["balance"] += amount
            database[acno]["transaction"].push({
              amount:amount,
              type:"CREDIT"
            })
    
            return {
                statusCode:422,
                status:true,
                message:"Amount successfully deposited And new balance is" + database[acno]["balance"]
            }
            
    
          }
          else{
            return {
                statusCode:422,
                status:false,
                message:"incorrect password"
            }
    
          }
    
        }
        else{
          return  {
            statusCode:422,
            status:false,
            message:"user No doesn't exist"
        }
        }
        
    
      }

  module.exports={
      register,
      login,
      deposit
  }
