const express = require("express");
const app = express();
const pug = require("pug");
const port = process.env.PORT || 8000;
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();
require("static/contact.js");
  
//mongoose Connection
  mongoose.connect(process.env.MONGOOSE_URL_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(()=>
  console.log("Connected successfully")).catch((err)=>
  console.log(err));

const contactSchema = new mongoose.Schema({
    nam: String,
    age: String,
    city: String,
    mobileNo: String,
  });
  
  const Contact = mongoose.model("contact", contactSchema);

  //linking static files
app.use("/static", express.static("static"));

//adding pug view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//get method for renderning
app.get("/", (req, res) => {
  const param = { title: "Fitbit" };
  res.status(200).render("index.pug", param);
});

app.get("/contact", (req, res) => {
  const param = { title: "Contact us" };
  res.status(200).render("contact.pug", param);
});
app.get("/bmi", (req, res) => {
  const param = { title: "bmi" };
  res.status(200).render("bmi.pug", param);
});
//post method for posting
app.post("/contact",async (req, res) => {
  var myData = new Contact(req.body);
  await Contact.create(myData).then(() => {
      res.status(200).render("success.pug");
    }).catch(() => {
      res.status(400).send("item was not saved to the database");
    });
});

app.get("/about", (req, res) => {
  const param = { title: "About us" };
  res.status(200).render("about.pug", param);
});

app.get("/gallery", (req, res) => {
  const param = { title: "Gallery" };
  res.status(200).render("gallery.pug", param);
});
//listening to the port
app.listen(port, () => {
  console.log(`The application started on port ${port}`);
});