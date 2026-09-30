import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

dotenv.config(
    {
          path:"./.env"
    }
)

app.use(cors({
    origin:process.env.CROSS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:"16kb"}))  // req.body se data max size  16kb. data json me hoga jo frontent se aayaga
app.use(express.urlencoded({extended:true,limit:"16kb"}))  //yaha data html ke rup me aata hai usko samhe ke liye.
app.use(express.static("public"))



app.use(cookieParser())

import registerRouter from "./router/user.router.js"
import loginRouter from "./router/user.router.js"
import logoutRouter from "./router/user.router.js"
import updateDetail from "./router/user.router.js"
import updatePassword from "./router/user.router.js"
import getUserRouter from "./router/user.router.js"
import refreshAccesstokenRouter from "./router/user.router.js"

import createCategory from "./router/category.router.js"
import  getCategoryByIdRouter  from "./router/category.router.js"
import getAllCategortRouter from "./router/category.router.js"
import updatecategoryRouter from "./router/category.router.js"
import deletecategoryRouter from "./router/category.router.js"

import createAddressRouter from "./router/address.router.js"
import getaddressRouter from "./router/address.router.js"
import updateAddressRouter from "./router/address.router.js"
import deleteAddressRouter from "./router/address.router.js"
import getAllAddressRouter from "./router/address.router.js"

import createCartRouter from "./router/cart.router.js"
import  getOrderRouter from "./router/order.router.js" 
import updateOrderRouter from "./router/order.router.js"
import deleteOrderRouter from "./router/order.router.js"

import createOrderRouter from "./router/order.router.js"


import createProductRouter from "./router/product.router.js"
import getProductByIdRouter from "./router/product.router.js"
import updateProductRouter from "./router/product.router.js"
import deleteProductRouter from "./router/product.router.js"

import createOrderitemRouter from "./router/orderItem.router.js"
import updateOrderItem from "./router/orderItem.router.js"
import getOrderItemRouter from "./router/orderItem.router.js"
import deleteOrderItemRouter from "./router/orderItem.router.js"


app.use("/api/v1/users",registerRouter)
app.use("/api/v1/users",loginRouter)
app.use("/api/v1/users",logoutRouter)
app.use("/api/v1/users",updateDetail)
app.use("/api/v1/users",updatePassword)
app.use("/api/v1/users",getUserRouter)
app.use("/api/v1/users",refreshAccesstokenRouter)


app.use("/api/v1/category",createCategory)
app.use("/api/v1/category",getCategoryByIdRouter)
app.use("/api/v1/category",getAllCategortRouter)
app.use("/api/v1/category",updatecategoryRouter)
app.use("/api/v1/category",deletecategoryRouter)


app.use("/api/v1/address",createAddressRouter)
app.use("/api/v1/address",getaddressRouter)
app.use("/api/v1/address",updateAddressRouter)
app.use("/api/v1/address",deleteAddressRouter)
app.use("/api/v1/address",getAllAddressRouter)

app.use("/api/v1/cart",createCartRouter)


app.use("/api/v1/order",createOrderRouter)
app.use("/api/v1/order",getOrderRouter)
app.use("/api/v1/order",updateOrderRouter)
app.use("/api/v1/order",deleteOrderRouter)


app.use("/api/v1/product",createProductRouter)
app.use("/api/v1/product",getProductByIdRouter)
app.use("/api/v1/product",updateProductRouter)
app.use("/api/v1/product",deleteProductRouter)

app.use("/api/v1/orderitem",createOrderitemRouter)
app.use("/api/v1/orderitem",updateOrderItem)
app.use("/api/v1/orderitem",getOrderItemRouter)
app.use("/api/v1/orderitem",deleteOrderItemRouter)
export {app}