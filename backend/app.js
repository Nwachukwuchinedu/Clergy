import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import rateLimitMiddleware from "./middleware/rateLimiter.js";
import authRoutes from "./routes/auth.routes.js";
import teachingRoutes from "./routes/teaching.routes.js";
import connectDB from "./config/db.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
// app.use(rateLimitMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/teachings", teachingRoutes);

// Static uploads
app.use("/uploads", express.static("public/uploads"));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
