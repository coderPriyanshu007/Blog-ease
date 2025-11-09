import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import userRoutes from "./routes/userRoutes.js";





const app = express();

dotenv.config();


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use('/blogs',blogsRoutes);
app.use('/user',userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
