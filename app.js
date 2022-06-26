const express=require("express");
const app=express();
const hbs=require('pug');
const port=process.env.port || 8000;
const path=require("path");
const fs=require("fs");
const bodyparser=require("body-parser");
const { get } = require("http");
const { createRequire } = require("module");

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get("/index",(req,res)=>{
    const param={'title':"Home"};
    res.status(200).render('index.pug',param);
});
app.get("/contact",(req,res)=>{
    const param={'title':"Contact us"};
    res.status(200).render('contact.pug',param);
});
app.get("/about",(req,res)=>{
    const param={'title':"About us"};
    res.status(200).render('about.pug',param);
});
app.get("/gallery",(req,res)=>{
    const param={'title':"Gallery"};
    res.status(200).render('gallery.pug',param);
});
app.listen(port,()=>{
    console.log(`The application started on port ${port}`);
})