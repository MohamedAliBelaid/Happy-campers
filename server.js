const express = require ('express');
const app =express();
const port=5000;
app.use(express.static('public'))
const mongoose = require('mongoose')
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
const User = require('./user/schema.js');
const Events = require('./user/schemaEvent.js');
const Posts = require('./user/schemaPost.js');
mongoose.connect('mongodb://localhost:27017/happy-camper', { useNewUrlParser: true,useUnifiedTopology: true });///to connect mongoose


app.post('/sign',(req,res)=>{ 
    console.log(req.body.username,req.body.email,req.body.password)
var username=req.body.username;
var email=req.body.email
var password=req.body.password;
User.create({ // create user 
    username: username,
    email:email,
    password: password
})
res.redirect('/')
})

app.post('/login', async (req, res) => {
    console.log('-----------------------------------------');
    let compare='';
    await User.findOne({email: req.body.email}, (err, data) =>{
        if(data){
            compare = JSON.parse(JSON.stringify(data));
            console.log('data',data);
        }
       
    })
    console.log('compare',compare);
    if(req.body.email === compare.email && req.body.pass === compare.password){
        res.send({status: "successLogg", username: compare.username});
    }
})




app.listen(port,()=> console.log('Server started on port ${port}'))