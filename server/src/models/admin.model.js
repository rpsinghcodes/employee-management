import mongoose from 'mongoose';
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['admin', 'employee'],
  },
});


const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;