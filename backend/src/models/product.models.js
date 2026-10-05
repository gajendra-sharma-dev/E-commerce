import mongoose,{Schema} from "mongoose"
import slugify from "slugify"
const productSchema = new Schema({
    name:{
        type:String,
        required:true,
      
    },
   
    description:{
         type:String,
         required:true,

    },
  
    category:{
       type:String,
       required:true
    },
    stockQuantity:{
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
     imageUrl : {
        type:String,
        required:true
        
    },
    rating :{
  type:Number,
  default:0,
  min:[0],
  max:[5]
    },
        numReviews:{
        type:Number,
        default:0,
        min:[0]
    }

    
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

