const mongoose = require("mongoose");
const express = require("express");

// Schema already imported in Route so for connection just inport Route
const studentRoute = require("./studentRoutes/studentRoutes");

// npm i cors - for instlling core(cross origin resource sharing) used to exchange data b/w mongoDB and NodeJS app (like internet)
const cors = require("cors");

// Instantiate express
const app = express();
mongoose.set("strictQuery",true);    // used to maintain constant changes in code(app)

/*url = mongodb+srv://Thakshith:<password>@cluster0.eb9tzxj.mongodb.net/ 
to connect -> mongoose.connect(url)*/

// -> mongoose.connect("mongodb+srv://Thakshith:nithinnihal@cluster0.eb9tzxj.mongodb.net/School");

// If our password contains special characters use below 3 lines
const password = encodeURIComponent("Thakshith4@"); 
const uri = `mongodb+srv://Thakshith:${password}@cluster0.eb9tzxj.mongodb.net/School`;
mongoose.connect(uri);       // This url used to connect to the MongoDB database
//above 3 lines used to define connection url if password contains special characters */

//Initialise the connection
const db = mongoose.connection;       // Gives rise to connection event

// Handling the connection
db.on("open" , () => {
    console.log("database connected");
});

db.on("error" , (err) => {
    console.log("error while connecting to database");
});

app.use(express.json());     // converts express
app.use(cors());
// connection this index.js with studentRoute so that it connects to backend
app.use("/students", studentRoute);

const port = 5500;

app.listen(port,() => {
    console.log("our server started on " + port);
});

