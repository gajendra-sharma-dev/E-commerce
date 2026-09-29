import mongoose,{Schema} from "mongoose"

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
      
    },
    slug:{  // esko padna eske baare me data base save karne se phle kya hota hai
        type:String,
        required:true,
         

    },
    description:{
         type:String,
         required:true,

    },
    sku:{  //seko bi padna contoller me kase kaam karta hai sku id se product ki phehane hoti hai
        type:String,
        required:true,
        unique:true,
        uppercase:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    stockQuanitity:{
        type:Number,
        required:true,
        default:0,
        min:[0]
    },
    price:{
        type:Number,
        required:true,
        default:0,
        min:[0]
    },
    isActive:{
        type:boolean
    },
    
},{timestamps:true})


export const Product = mongoose.model("Product",productSchema)

