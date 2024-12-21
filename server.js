const express =require("express")
const connectDb=require("./config/dbConnection")
const errorHandler=require('./middleware/errorHandler')
const dotenv =require("dotenv").config();


connectDb();
const app= express()

const PORT=process.env.PORT||5000;

app.use(express.json())
 app.use('/api/contacts',require('./routes/contactRoutes'))
 app.use('/api/users',require('./routes/userRoutes'))
 app.use(errorHandler)
 
app.listen(PORT,()=>{
    console.log(`hello this app is use on ${PORT} port`)
})