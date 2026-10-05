import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        index:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        
        lowercase:true,
        trim:true,
        index:true,

    },
    email:{
         type:String,
         required:true,
         unique:true,
         lowercase:true,
         trim:true,
          

    },
    phoneNumber :{
        type:Number,
        required:true,
       
    },
    role :{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    password:{
        type:String,
        required:true
    },

    verfiyed : {
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.ispasswordisCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        name:this.name,
        email:this.email,
        
    },
    process.env.ACCESSTOKEN_SECRET_ACCESS_KEY,
    {
        expiresIn:process.env.ACCESSTOKEN_EXPIRY_KEY
    }
)
}



userSchema.methods.genrateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
        name:this.name,
        email:this.email,
      
    },
    process.env.REFRESH_SECRET_REFERSH_KEY,
    {
        expiresIn:process.env.REFRESH_EXPIRY_KEY
    }
)
}



export const User = mongoose.model("User",userSchema)

