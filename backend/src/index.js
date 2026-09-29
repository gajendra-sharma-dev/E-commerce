
import connectDB from "../src/db/db.js"
import {app} from "./app.js"

let port = process.env.PORT || 4000

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`app is listning on ${port}`);
        
    })
    }).catch((err)=>{
        console.log(`MongoDB connection failed:`,err);
        
})

