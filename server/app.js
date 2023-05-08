import express from "express";
const app = express();



const PORT = process.env.PORT || 8080;
app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log("Server is running on PORT:", PORT);
});