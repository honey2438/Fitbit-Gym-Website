const express = require("express");
const app = express();
const pug =require("pug");
const port = process.env.PORT || 8000;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://localhost:27017/newdatabase`);
}

app.use("/static", express.static("static"));
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get("/index", (req, res) => {
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
  mobileNo: String,
});

const contact = mongoose.model("contact", contactSchema);

app.post("/contact", (req, res) => {
  var myData = new contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.status(400).send("item was not saved to the databse");
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
