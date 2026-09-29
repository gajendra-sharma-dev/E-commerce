import mongoose,{Schema} from "mongoose"

const cartSchema = new Schema({
    sessionId:{
        type:String,
        default:null,
        
    },
    customer:{  // esko padna eske baare me data base save karne se phle kya hota hai
        type:Schema.Types.ObjectId,
        ref:"User"
         

    },
   
    
},{timestamps:true})


export const Cart = mongoose.model("Cart",cartSchema)

