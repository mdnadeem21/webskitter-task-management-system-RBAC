require('dotenv').config()
const express = require('express');
const app = express();
const connectDB=require('./app/config/db');
const cookieParser=require('cookie-parser');
const cors=require('cors');

//connect to database
connectDB();

//cors
app.use(cors())

app.use(cookieParser())

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
  res.send('Hello from the basic Express app!');
});


const PORT = process.env.PORT || 9090;
app.listen(PORT,(error)=>{
    if(error){
        console.log(`Error in PORT Listening : ${error.message}`);
    }else{
        console.log("server is running on port ",`http://localhost:${PORT}`);
    }
})