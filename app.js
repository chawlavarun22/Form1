const express = require ("express");
const app = express();
const fs = require ("fs")
const path = require("path")
const mongoose = require('mongoose');
const port = 3001;
const bodyparser = require("body-parser");


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

const contactSchema = new mongoose.Schema({
    name: String,
    gender: String,
    password: String,
    age: Number,
    email:String
});

const Contact= mongoose.model('contact',contactSchema);

app.use(express.urlencoded({ extended: true }))
app.use(express.json());   


app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))

app.get("/",(req,res)=>{
    res.status(200).render("index.pug")

})

app.get("/Login",(req,res)=>{
    res.status(200).render("Login")

})


app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        //res.render(200)("this item is save to data base")
     }).catch(()=>{
         //res.status(400).send("item was not saved to database")
     })
   
    
    res.render("index.pug")

})

app.post("/Login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
      const useremail = await  myData.findOne({email:email});
    if(useremail.password === password){
        res.status(201).render("index")
    }else{
        res.send("password is not matching");
    }

    }catch(error){
        res.status(400).send("invalid")
    }

})

  

app.listen(port,()=>{
    console.log[`the application started on port ${port}`]
})