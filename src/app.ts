import dotenv from "dotenv";

dotenv.config();

import express from "express";
import userRoutes from "./routes/authRoutes";
import recordsRoutes from "./routes/medicalRecords";
import patientsRoutes from "./routes/patient";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swaggerConfig";
import mongoose from "mongoose";
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/auth", userRoutes);
app.use("/api/records", recordsRoutes);
app.use("/api/patients", patientsRoutes);

const port = process.env.PORT || 3000;

const MONGODB_URI = process.env.DATABASE_URL;
mongoose.connect(MONGODB_URI as string, {}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
