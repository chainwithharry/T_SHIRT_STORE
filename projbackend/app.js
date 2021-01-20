const express = require("express");
const mongoose = require("mongoose");
const app = express();


//MIDDLEWARE FILES
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cookie } = require("express-validator");

//ENVIRONMENT FILES
require('dotenv').config();

//ROUTING FILES
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");
const paymentBRoutes = require("./routes/payment.js");


//DB CONNECTION
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(()=>{
    console.log(`DB IS CONNECTED...!`);
});


//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//ROUTES
app.use("/api" , authRoutes);
app.use("/api" , userRoutes);
app.use("/api" , categoryRoutes);
app.use("/api" , productRoutes);
app.use("/api" , orderRoutes);
app.use("/api" , paymentBRoutes);


//PORT
const port = process.env.PORT || 8000;


//STARTING SERVER
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
