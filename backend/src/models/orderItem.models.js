import mongoose,{Schema} from "mongoose"

const orderitemSchema = new Schema({
    unitPrice:{
        type:Number,
        required:true,
      
    },
    quanitity:{  // esko padna eske baare me data base save karne se phle kya hota hai
        type:Number,
        required:true,
        
    },
  
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    
    productName:{
        type:String,
        required:true
    },
     sku:{  //seko bi padna contoller me kase kaam karta hai sku id se product ki phehane hoti hai
        type:String,
        required:true,
        unique:true,
        uppercase:true
    },
    order:{
        type:Schema.Types.ObjectId,
        ref:"Order"
    },
    totelPrice :{
        type:Number,
        required:true
    }
   
    
},{timestamps:true})


export const Orderitem = mongoose.model("Orderitem",orderitemSchema)
