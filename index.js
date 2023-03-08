
const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 3000;

const cors = require('cors')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

require('dotenv').config()


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

//middleware
app.use(express.json());


//Routes
app.use("/api/contactDetails" , require("./routes/contactDetailRoute"))
app.use("/api/location" , require("./routes/locationRoute"))
app.use("/api/parking" , require("./routes/parkRoute"))
app.use("/api/user" , require("./routes/userRoute")) 
app.use("/api/findings" , require("./routes/FindingsRoute"))
app.use("/api/title" , require("./routes/TitleRoute"))
app.use("/api/parkCapacity" , require("./routes/parkingCapacityRoute"))
app.use("/api/admin" , require("./routes/adminRoute"))
app.use("/api/forgetPassword" , require("./routes/userForgetRoute"))
app.use("/api/reviews" , require("./routes/reviewsRoute"))




app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));