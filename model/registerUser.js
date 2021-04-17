const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const userSchema=new mongoose.Schema({
  email:{
     type:String,
     require:true,
     unique:true
   },
   userBlogs:[{
      name:{
           type:String,
           require:true
         },
         image:{
           type:String,

         },
         blogCategory:{
         type:String,
         require:true
         },
         blogIntro:{
            type:String,
            require:true,
            max:200
         },
         blogContent:{
           type:String,
           require:true,
         },
         blogOutro:{
           type:String,
           max:300
         },
         reviews:[{
                    username:{
                     type:String,
                     require:true
                    },
                    rating:{
                        type:String,
                        required:true
                      },
                      comment:{
                        type:String
                      }
                 }]
   }]

})

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema);