import express from "express";
import path from "path";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017", { dbName: "backend" })
  .then((c) => {
    // console.log(c, "database connected");
  });

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Message = mongoose.model("Message", messageSchema);

const app = express();
const users = [];
// setting up ejs engine
app.set("view engine", "ejs");

// using middle ware
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index", { name: "singh" });
});
app.get("/success", (req, res) => {
  res.render("success");
});
app.post("/contacts", async (req, res) => {
  console.log("contacts created");
  const messageData = { name: req.body.name, email: req.body.name };
  await Message.create(messageData);
  // res.redirect("/success");
});
app.get("/users", (req, res) => {
  res.json({
    users,
  });
});
app.get("/add", (req, res) => {
  // Message.create({ name: "a", email: "wdw" }).then(() => {
  //   res.send("Nice");
  // });
});
app.listen(5000, () => {
  console.log("server working");
});
