import mongoose,{Schema} from "mongoose"

const cartitemSchema = new Schema({
    unitPrice:{
        type:Number,
        required:true,
      
    },
    quanitity:{  // esko padna eske baare me data base save karne se phle kya hota hai
        type:Number,
        required:true,
        
    },
  
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    
    CartId:{
        type:Schema.Types.ObjectId,
        ref:"Cart"
    },
   
    
},{timestamps:true})


export const Cartitem = mongoose.model("Cartitem",cartitemSchema)

