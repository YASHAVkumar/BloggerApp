const mongoose=require('mongoose');
const User=require('./registerUser');
const blogsSchema=new mongoose.Schema({
  blogs:[{type:mongoose.Schema.Types.ObjectId,
  ref:'User'}]
});
module.exports=mongoose.model('Blog',blogsSchema);