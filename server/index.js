const express=require('express');
const dbConnect=require("./Config/database");
const routes=require('./routes/userRoutes');
const cookie=require('cookie-parser');
const cors=require('cors');
const app=express();
require("dotenv").config();

const PORT =process.env.PORT || 4000

app.use(express.json());
app.use(cookie());
app.use(cors(
    {
        origin:"*",
        credentials:true,
        exposedHeaders: ['Authorization'],
        

    }
))
app.use("/auth",routes);

dbConnect();

app.listen(PORT,()=>{
    console.log(`The server is up and running at port ${PORT}`)
})
