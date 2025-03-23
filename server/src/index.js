import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import connectDB from './config/db.js';
import employeeRoutes from './routes/employee.routes.js';
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ 
  limit: 10000000,
  extended: true,
  parameterLimit: 50000,  
}));

const port = process.env.PORT || 4000;

var accessLogStream = fs.createWriteStream(path.join('./', 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/employee', employeeRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});