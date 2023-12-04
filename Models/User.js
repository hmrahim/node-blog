const {Schema,model} = require("mongoose")

const userSchema = new Schema({
    username:{
        type:String,
        maxLength:30,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    }
},{
    timestamps:true
})


const User = model("User",userSchema)
module.exports = User