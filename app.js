const express = require("express");
const app = express();
const pug = require("pug");
const port = process.env.PORT || 8000;
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://honeysirohi2438:<Honey@0812>@cluster0.p9xkv.mongodb.net/Customers"
  );
}
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
  mobileNo: String,
});

const contact = mongoose.model("contact", contactSchema);

app.post("/contact", (req, res) => {
  var myData = new contact(req.body);
  myData
    .save()
    .then(() => {
      res.status(200).render("success.pug");
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
