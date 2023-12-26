const express = require("express");
const morgan = require("morgan");
const app = express();
const authRoute = require("./Routes/authRoutes");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config()
require("./middleware/passport")
const passport = require("passport")
const setLocals = require("./middleware/setLocals");
const MongoDBStore = require("connect-mongodb-session")(session);
const dashboardRoute = require("./Routes/dashboardRoute");
const { bindUserWithRequiest } = require("./middleware/authMiddleware");
const cors = require("cors")


// const uri = `mongodb+srv://exp_blog:MJ4n5c547YvJStkv@cluster0.trq2z.mongodb.net/blog_exp`;
const uri = `mongodb://127.0.0.1:27017`;



// setup middleware
const middleware = [
  morgan("dev"),
  express.static("public"),
  express.json(),
  express.urlencoded({ extended: true }),
  passport.initialize(),
  cors()
 
];

app.use(middleware);

app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);

app.get("/", (req, res) => {
  res.render("pages/auth/signup.ejs", { title: "Create a new account" });
});

// app.get('/auth/profile', passport.authenticate('jwt', { session: false }),(req,res)=> {
//   res.status(200).send({
//     id:req.user._id,
//     email:req.user.email
// });
// });

const db = mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
      console.log("database Connected");
    });
  });
