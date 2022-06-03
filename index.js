//for calling environment variables
require('dotenv').config()

// for express
const express = require('express')
const app = express()

//for mongoose
const mongoose = require("mongoose")

//middlewares or bridges import
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//path
const path = require("path");

//routes list
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const testRoutes = require("./routes/test")
const testSubmissionRoutes = require("./routes/testSubmission")



// middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())



//routes
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",testRoutes)
app.use("/api",testSubmissionRoutes)




// database connection

mongoose.connect(process.env.DATABASE,
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}    
)
.then(() => console.log("database connected"))
.catch(err => console.log(err));







//server creation
const port = process.env.PORT || 7000

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

//production

if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
}
// // Making Build Folder as Public 
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


// Making Build Folder as Public 
//app.use(express.static(path.join(__dirname, 'build')));

//app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, 'build', 'index.html'));
//});


//------


app.get('/', (req, res) => {
  res.send('Hello World!')
})
