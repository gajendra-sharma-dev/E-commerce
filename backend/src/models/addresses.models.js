import mongoose,{Schema} from "mongoose"

const addressesSchema = new Schema({
    city:{
        type:String,
        required:true,
      
    },
    state:{
        type:String,
        required:true,
         

    },
    country:{
         type:String,
         required:true,

    },
    phoneNumber :{
        type:Number,
        required:true,
        unique:true
    },
    isDefault:{
        type:Boolean
    },
    customer:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    postelCode:{
        type:String,
        required:true,
    },
    line1:{
        type:String,
        required:true,
    },
    line2:{
        type:String,
        required:true,
    }
},{timestamps:true})


export const Addresses = mongoose.model("Addresses",addressesSchema)

