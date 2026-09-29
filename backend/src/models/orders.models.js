import mongoose,{Schema} from "mongoose"

const orderSchema = new Schema({
    totelAmount:{
        type:Number,
        required:true,
      
    },
    taxAmount:{  // esko padna eske baare me data base save karne se phle kya hota hai
        type:Number,
        required:true,
        
    },
     shippingCost:{
        type:Number,
        required:true,
      
    },
    subTotel:{
          type:Number,
        required:true,

    },
  
    orderNumber:{
       type:String,
       unique:true
    },
    
    shippingAddress:{
        type:Schema.Types.ObjectId,
        ref:"Addresses"
    },
     billingAddress:{
        type:Schema.Types.ObjectId,
        ref:"Addresses"
     },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    Status:{
        type:String,
        required:true,
        enum:['PENDING','PROCESSING','SHIPPED','DELIVERED','CANCELLED'],
        default:'PENDING'

    },
    
   
    
},{timestamps:true})


export const Order = mongoose.model("Order",orderSchema)
