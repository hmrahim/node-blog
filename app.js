const express = require("express")
const app = express()
const port = process.env.PORT || 5000



app.get("/",(req,res)=> {
    res.json({
        message:"hello world"
    })
})







app.listen(port, () => {
    console.log(`Server started on port`);
});