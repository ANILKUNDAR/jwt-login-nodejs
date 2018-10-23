const express = require('express');
const jwt=require('jsonwebtoken')
const app = express();

app.get('/api',(req,res)=>{
  res.json({
    message:'welcome to the API'
  })
})

app.post('/api/posts/',verifyToken,(req,res)=>{
  jwt.verify(req.token,'secretkey',(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }else{
      res.json({
        message:'Post created',
        authData
      })
      
    }
  })
 
})

app.post('/api/login',(req,res)=>{
  //Mock User
  const user={
    id:1,
    username:'anil',
    email:'anil@gmail.com'
  }
  jwt.sign({user},'secretkey',{ expiresIn:'30s'},(err,token)=> {
    res.json({
      token
    })
  });
})
//format of token
//AUthirization : Bearer <access_token>
//verify
function verifyToken(req,res,next){
  //Get auth header value
  const bearerHeader=req.headers['authorization'];
  //check if undefined
  if(typeof bearerHeader !=='undefined'){
    //split at the space
    const bearer=bearerHeader.split(' ');
    //get token from array
    const bearerToken=bearer[1];
    //set token
    req. token=bearerToken;
    //next middleware
    next();
  }else{
    //forbidden
    res.sendStatus(403)
  }
}

app.listen(5000,()=>console.log('Server started on port 5000'))

module.exports=app;