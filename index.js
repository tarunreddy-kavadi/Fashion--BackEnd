
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/authentication");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  const corsOptions = {
    origin: 'https://quiet-kulfi-8dacf7.netlify.app',
    optionsSuccessStatus: 200,
    credentials: true
  }
  
app.use(cors(corsOptions))
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.get("/",(req,res)=>{
res.send("Hello its Working")
})
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
// exports.app = functions.https.onRequest((req,res)=>{
//   functions.logger.info("hello logs", { structuredData: true});
//   res.send("hello Its Working")
// })
