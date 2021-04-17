const express=require('express');
const router=express.Router();
const Blog=require('../../model/allBogs');
const User=require('../../model/registerUser');



router.get('/addBlog',(req,res)=>{
    res.render('addBlog');
});

router.post('/addBlog',async(req,res)=>{
    const content= await new Blog(req.body);
    content.save();
    const user=req.user;
    user.userBlogs.push(req.body);
    await user.save();
   res.redirect('/');
});

router.get('/myBlogs/:id',async (req,res)=>{
   const object=await User.findById(req.params.id);
   res.render('myBlogs',{'blogs':object.userBlogs});
});



router.get('/myBlogs/:myId/Blog/:blogId',async (req,res)=>{
    const user=await User.findById(req.params.myId);
    for(var blog of user.userBlogs)
    {
      if(String(blog._id)===String(req.params.blogId))
        { const obj={userId:user._id,blog:blog};
         //console.log(obj);
          res.render('blog',{'obj':obj});
        }
    }
});


router.get('/myBlog/edit/:id',(req,res)=>{
    for(var blog of req.user.userBlogs)
        {
         if(String(blog._id)===String(req.params.id))
           {
            res.render('edit',{'blog':blog});
           }
       }
});

router.patch('/myBlog/edit/:id',async(req,res)=>{
   const userData=req.user.userBlogs;
   for(var blog of userData)
       {
         if(String(blog._id)===String(req.params.id))
           {
             // console.log(userData.indexOf(blog));
              var index=userData.indexOf(blog);
              userData[index]=req.body;
           }
       }
   const newData=await User.findByIdAndUpdate(req.user._id,{'userBlogs':userData});
   res.redirect('/');
})


router.delete('/myBlog/delete/:id',async(req,res)=>{
     const userData=req.user.userBlogs;
     var index;
     for(var blog of userData)
        {
            if(String(blog._id)===String(req.params.id))
              {
                // console.log(userData.indexOf(blog));
                 index=userData.indexOf(blog);

              }
        }
     userData.splice(index,1);
     const newData=await User.findByIdAndUpdate(req.user._id,{'userBlogs':userData});
     res.redirect('/');
});



/***Review Comments
router.post('/myBlogs/:myId/Blog/:blogId/review',async (req,res)=>{

   console.log('had ha yaar');
    //console.log(req.params);
   // const user=await User.findById(req.user._id);
   //const data=await new Review(req.body.review);


       const userData=req.user.userBlogs;

       for(var blog of userData)
              {
             if(String(blog._id)===String(req.params.blogId))
               {
                 // console.log(userData.indexOf(blog));
                  var index=userData.indexOf(blog);
                  userData[index].review.push(req.body.review);
               }
             }
             //console.log(userData);
         const newData=await User.findByIdAndUpdate(req.user._id,{'userBlogs':userData});

         newData.save();
   res.redirect('/myBlogs/'+req.params.myId+'/Blog/'+req.params.blogId);
});
**/


/*******************Review Section ***************************/

router.post('/myBlogs/:myId/Blog/:blogId',async(req,res)=>{
    var obj={username:req.user.username,rating:req.body.rating,comment:req.body.comment};
    const userData=await User.findById({_id:req.params.myId});
    const userBlogs=userData.userBlogs;
       for(var blog of userBlogs)
         {
            if(String(blog._id)===String(req.params.blogId))
               {
                  var index=userBlogs.indexOf(blog);
                  userBlogs[index].reviews.push(obj);
               }
         }
    const newData=await User.findByIdAndUpdate({_id:req.params.myId},{'userBlogs':userBlogs});
    res.redirect('/myBlogs/'+req.params.myId+'/Blog/'+req.params.blogId);
});


module.exports=router;