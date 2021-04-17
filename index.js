const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const login=require('./routes/auth/login');
const logout=require('./routes/auth/logout');
const register=require('./routes/auth/register');
const User=require('./model/registerUser');
const BlogCrud=require('./routes/blogs/allBloggs');
const methodOverride = require('method-override')
const {MONGOURL}=require("./keys")

app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(methodOverride('_method'))

mongoose.connect(MONGOURL||'mongodb://localhost:27017/loginSys', { useNewUrlParser: true, useUnifiedTopology: true})
.then((res)=>{
   //console.log(res);
   console.log("successfully connected to database u can work now");
})
.catch((err)=>{
  console.log('oh no error aa gya');
  throw err;
});


/*********************local storing concepts ****************/
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');


app.use(session({
    secret: 'ThisIsNotASecureLoginSystem',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


app.get('/',async(req,res)=>{
 const users=await User.find({});
//  console.log(users);
    res.render('index',{'users':users})
  res.end();
});


app.use(login);
app.use(register);
app.use(logout);
app.use(BlogCrud);
var port=process.env.PORT||9000;
app.listen(port,()=>{
  console.log('server is running... at port 9000');

});