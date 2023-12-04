const express = require("express");
const morgan = require("morgan");
const app = express();
const authRoute = require("./Routes/authRoutes")
const port = process.env.PORT || 5000;
const mongoose = require("mongoose")

// setup view engine
app.set("view engine", "ejs");
app.set("views", "views");

// setup middleware
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.json(),
  express.urlencoded({ extended: true }),
];

app.use(middleware);

app.use("/auth",authRoute)

app.get("/", (req, res) => {
 res.render("pages/auth/signup.ejs",{title:"Create a new account"})
});

const uri = `mongodb+srv://exp_blog:MJ4n5c547YvJStkv@cluster0.trq2z.mongodb.net/blog_exp`;


 const db =  mongoose.connect(uri,{
  useNewUrlParser:true
 })
 .then(()=> {
  app.listen(port, () => {
    console.log(`Server started on port`);
    console.log("database Connected");
  });

 })



