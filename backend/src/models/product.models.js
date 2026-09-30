import mongoose,{Schema} from "mongoose"
import slugify from "slugify"
const productSchema = new Schema({
    name:{
        type:String,
        required:true,
      
    },
    slug:{  // esko padna eske baare me data base save karne se phle kya hota hai
       type:String,
        unique:true,
         

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
        type:Boolean
    },
    
},{timestamps:true})

// Auto-generate slug before saving
productSchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();

  let baseSlug = slugify(this.name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Ensure uniqueness
  const Product = this.constructor;
  while (await Product.exists({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
  
});



export const Product = mongoose.model("Product",productSchema)

