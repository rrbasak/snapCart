// import express, { urlencoded } from "express";
// import colors from "colors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productsRoutes from "./routes/productsRoutes.js";
// import subcategoryRoute from "./routes/subcategoryRoute.js";
// import cors from "cors";
// import { errorMiddleware } from "./middlewares/authMiddleware.js";
// import cookieParser from "cookie-parser";
// import http from "http";

// //socket connection
// import { Server } from "socket.io";
// //configure env
// dotenv.config();

// //database config
// connectDB();

// //rest object
// const app = express();

// //cookie parser
// app.use(cookieParser());

// //middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: false }));

// //routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productsRoutes);
// app.use("/api/v1/subcategory", subcategoryRoute);

// //middleware
// app.use(errorMiddleware);

// //rest api
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to e commerce app",
//   });
// });

// //set view engine
// app.set("view engine", "ejs");

// // Port number
// const port = process.env.PORT || 8080;

// //rus listen

// const server = http.createServer(app);

// // app.listen(port, () => {
// //   ////console.log(`listening on port ${port}`.bgCyan.white)
// // });

// // Initialize Socket.IO server with CORS options
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Ensure this matches your client URL
//     methods: ["GET", "POST"]
//   }
// });

// //socket connection
// io.on("connection", (socket) => {
//   //console.log("A user connected");

//   socket.on("disconnect", () => {
//     //console.log("User disconnected");
//   });
// });

// server.listen(port, () => {
//   //console.log(`listening on port ${port}`.bgCyan.white);
// });

// export { io };

// import express, { urlencoded } from "express";
// import colors from "colors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productsRoutes from "./routes/productsRoutes.js";
// import subcategoryRoute from "./routes/subcategoryRoute.js";
// import cors from "cors";
// import { errorMiddleware } from "./middlewares/authMiddleware.js";
// import cookieParser from "cookie-parser";
// import http from "http";

// //socket connection
// // import { Server } from "socket.io";
// //configure env
// dotenv.config();

// //database config
// connectDB();

// //rest object
// const app = express();

// //cookie parser
// app.use(cookieParser());

// //middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: false }));

// //routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productsRoutes);
// app.use("/api/v1/subcategory", subcategoryRoute);

// //middleware
// app.use(errorMiddleware);

// //rest api
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to e commerce app",
//   });
// });

// //set view engine
// app.set("view engine", "ejs");

// // Port number
// const port = process.env.PORT || 8080;

// //rus listen

// app.listen(port, () => {
//   //console.log(`listening on port ${port}`.bgCyan.white)
// });

import express, { urlencoded } from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import subcategoryRoute from "./routes/subcategoryRoute.js";
import cartRoute from "./routes/cartRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import exchangeRoute from "./routes/exchangeRoute.js";
import pastSearchRoute from "./routes/pastSearchRoute.js";
import pastProductSearchRoute from "./routes/pastProductSearchRoute.js";
import productRAMRoute from "./routes/productRAMRoute.js";
import productSizeRoute from "./routes/productSizeRoute.js";
import productColorRoute from "./routes/productColorRoute.js";

import cors from "cors";
import { errorMiddleware } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

// Configure env
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

//console.log("server", process.env.LOGIN_RATE_LIMIT_WINDOW_MS);
//console.log(process.env.LOGIN_RATE_LIMIT_REQUESTS);
//console.log(process.env.LOGIN_RATE_LIMIT_MESSAGE);

// Vercel CORS Configuration
app.use(
  cors({
    origin: ["https://deploy-mern-1whq.versel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Cookie parser
app.use(cookieParser());

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Routes
// app.use("/api/v1/auth", authRoutes);
// Apply rate limiter only to authentication routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productsRoutes);
app.use("/api/v1/subcategory", subcategoryRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/exchange", exchangeRoute);
app.use("/api/v1/past-search", pastSearchRoute);
app.use("/api/v1/past-product-search", pastProductSearchRoute);
app.use("/api/v1/product-ram", productRAMRoute);
app.use("/api/v1/product-size", productSizeRoute);
app.use("/api/v1/product-color", productColorRoute);

// Middleware
app.use(errorMiddleware);

// Rest API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to e commerce app",
  });
});

// Set view engine
app.set("view engine", "ejs");

// Port number
const port = process.env.PORT || 8080;

// Listen on port
app.listen(port, () => {
  //console.log(`Listening on port ${port}`.bgCyan.white);
});