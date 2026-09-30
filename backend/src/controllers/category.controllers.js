import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Category}  from "../models/categories.models.js"
import mongoose from "mongoose"


const createCategory = asyncHandler(async(req,res)=>{
    const {name,description,parentId} = req.body
 //  console.log(req.body);
   
  
    if([name,description].some((filed)=>(filed?.trim() === ""))){
        throw new ApiError(400, "All fields are required")
    }

 const alreadyExists = await Category.findOne({name})

 if(alreadyExists){
    throw new ApiError(409, "Category already exists")
 }

 const category = await Category.create(
        {
            name,
            description,
            parentId 
            
        }
    )

    return res.status(200).
    json(new ApiResponse(200,category,"category is create successfully"))
})

const getCategoryById = asyncHandler(async(req,res)=>{
    const {categoryId} = req.params

    if(!mongoose.isValidObjectId(categoryId)){
        throw new ApiError(400,"category id is not vaild from")
    }

 const category  = await Category.findById(categoryId)
 // console.log(category);
 

   if(!category) {
    throw new ApiError(400,"category not found")
   }
  
  const findCategory =  await Category.findById(categoryId).populate('parentId','name')
    .sort({createdAt : -1})

   // console.log(findCategory);
    

    return res.status(200).
    json(new ApiResponse(200,findCategory,"category fetch successfully"))

})



  const getAllCategory = asyncHandler(async(req,res)=>{
    const {page = 1,limit=10,sortType="newest",query=""} = req.query

    const filter = query
    ? {name : {$regex:query,$options:'i'}} : {}

    console.log(filter);

    let sortOptions = {createdAt: -1}

    if(sortType === "oldest") {
        sortOptions = {createdAt:1}

    }else if(sortType === "az") {
        sortOptions = {name:1}
    }else if(sortType === "za")
        sortOptions = {name:-1}

        const allcategory = await Category.find(filter).
        sort(sortOptions).
        skip((page-1) * limit).
        limit(Number(limit))

        console.log(allcategory);
        

        const totelCategory = await Category.countDocuments(filter)

        console.log(totelCategory);

        return res.status(201).
        json(new ApiResponse(200,{allcategory,totelCategory,totelPages: Math.ceil(totelCategory / limit), currentPage:Number(page)},"all category fetch succssfully"))
  })
const updateCategory = asyncHandler(async(req,res)=>{
    const {name,description} = req.body
    const {categoryId} = req.params

    if(!mongoose.isValidObjectId(categoryId)) {
        throw new ApiError(400,"category id is not vaild")
    }

    if(!name || name?.trim() === "") {
        throw new ApiError(400,"name is required")
    }

 const category = await Category.findById(categoryId)

   if(!category) {
    throw ApiError(400,"category not found")
   } 

      if(name.trim()) category.name = name
      if(description.trim()) category.description = description

    await  category.save({validateBeforeSave:false})



   return res.status(200).
   json(new ApiResponse(201,category,"category update succssfully"))
 


})

const deleteCategory = asyncHandler(async(req,res)=>{
  const {categoryId} = req.params

  if(!mongoose.isValidObjectId(categoryId)) {
    throw new ApiError(400,"category id not found")
  }

 const category = await Category.findById(categoryId)

 if(!category) {
    throw new ApiError(400,"category is not found")
 }

  await Category.findByIdAndDelete(categoryId)

  res.status(201).
  json(new ApiResponse(201,{},"category delete succssfully"))
})

export {createCategory,getCategoryById,getAllCategory,updateCategory,deleteCategory}