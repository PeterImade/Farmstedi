

import env from "dotenv"
env.config() 

import mongoose from "mongoose" 

async function startDatabase()
{
    try 
    {
        const DB_URI = process.env.DB_URI || "" 

        // Get Database connection Object 
        const connection = mongoose.connection 

        // Attach Event Listeners To Database Connection 
        connection.on("connecting",()=>{
            console.log("Database connecting")
        })

        connection.on("connected",()=>{
            console.log("Database connected")
        })

        connection.on("disconnecting",()=>{
            console.log("Database disconnecting")
        })

        connection.on("disconnected",()=>{
            console.log("Database disconnected")
        })

        connection.on("error",(e: any)=>{
            console.log("Database Error")
            console.log(e) 
        })

        // Connect to database 
        await mongoose.connect(DB_URI)
    }
    catch(e: any)
    {
        console.log("Database Error") 
        console.log(e) 
    }
}


export default startDatabase 