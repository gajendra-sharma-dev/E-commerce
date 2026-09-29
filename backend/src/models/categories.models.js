import mongoose,{Schema} from "mongoose"
import slugify from "slugify"
const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
      
    },
   
     slug:{  // esko padna eske baare me data base save karne se phle kya hota hai
        type:String,
        unique:true,

    },
     description:{
         type:String,
         required:true,

    },
    parentId :{
        type:Schema.Types.ObjectId,
        ref:"Category",
      default:null
    }
   
    
},{timestamps:true})

// Auto-generate slug before saving
categorySchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();

  let baseSlug = slugify(this.name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Ensure uniqueness
  const Category = this.constructor;
  while (await Category.exists({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
  
});



export const Category = mongoose.model("Category",categorySchema)

