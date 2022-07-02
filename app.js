const express = require("express");
const app = express();
const pug = require("pug");
const port = process.env.PORT || 8000;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

  mongoose.connect('mongodb+srv://honeysirohi2438:1234@cluster0.p9xkv.mongodb.net/customerdata',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(()=>
  console.log("Connected successfully")).catch((err)=>
  console.log(err));

app.use("/static", express.static("static"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const param = { title: "Home" };
  res.status(200).render("index.pug", param);
});

app.get("/contact", (req, res) => {
  const param = { title: "Contact us" };
  res.status(200).render("contact.pug", param);
});


const contactSchema = new mongoose.Schema({
  nam: String,
  age: String,
  city: String,
  mobileNo: String
});

const contact = mongoose.model("contact", contactSchema);

app.use(bodyParser.json());

app.post("/contact", (req, res) => {
  var myData = new contact(req.body);
  myData.save().then(() => {
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

app.listen(port, () => {
  console.log(`The application started on port ${port}`);
});
