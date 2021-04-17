const express=require('express');
const User=require('../../model/registerUser');
const router=express.Router();


router.get('/register',(req,res)=>{
  res.render('register');
});

router.post('/register',async(req,res)=>{
   const {password,cpass}=req.body;

  if(password===cpass)
  {
  const user={
      username:req.body.uname,
      email:req.body.email
    }
    await User.register(user,req.body.password);
     res.redirect('/login');
  }
  else
  {
    //console.log('Password Don\'t match or Email is not unique ');
    req.session.error = 'Incorrect username or password';
    res.render('register');
   }
});

module.exports=router;