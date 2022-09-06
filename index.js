require("dotenv").config();
const express = require('express');
const { default: mongoose } = require("mongoose");
const apiRouter = require("./api/api.v1");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to the PHJ API. This is just the index page, visit '/api/v1'"
    })
})
app.use("/api/v1/", apiRouter);

// Error Handlling can be done here since this means that the route doesn't match any previous path.
app.use( (err, req, res, next)=>{
    console.error(err);
    res.status(500).json({status: "Failed", message: err.message})
})


const PORT = parseInt(process.env.PORT) || 3000;




// Server Start and Connect to DB
app.listen(PORT, (error)=>{
    if(error){
        throw error;
    }
    mongoose.connect(process.env.DB_URI,{},(error)=>{
        if(error){
            console.log(error.message);
            throw error.message;
        }
        console.log("Server is Connected with Database");

        
    });
})








