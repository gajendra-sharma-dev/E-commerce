import mongoose,{Schema} from "mongoose";


const cartSchema = new Schema({
    sessionId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{timestamps:true})


const Cart = mongoose.model("Cart",cartSchema)

export default Cart