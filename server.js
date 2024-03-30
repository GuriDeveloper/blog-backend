const express = require(`express`);
const app = express()
const cors = require(`cors`);
const morgan = require(`morgan`);
const dbConnect = require('./config/db')
const authRoutes = require('./routes/authRoute')
// dotenv config
require(`dotenv`).config()

dbConnect()

// middlewares

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));


// routes
app.use('/api/v1/auth',authRoutes)

app.listen(5500,()=>{
    console.log(`server running on port 5500...`)
})