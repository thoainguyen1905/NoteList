const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const route = require('./routes')

//connect DB
const connectDB = async ()=>{
try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nwjet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` )
    console.log('Mongoose DB connect')
} catch (error) {
    console.log(error)
    process.exit(1)
}
}
connectDB()
app.use(cors())
app.use(express.json()) // doc bat cu du lieu nao gui di
route(app)
app.get('/',(req,res)=>{
    res.send('Test')
})



app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})