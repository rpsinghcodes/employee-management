import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  imgUrl:{
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['admin', 'employee'],
  },
  password:String
});

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;