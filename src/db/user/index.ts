import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  functionalgrade: {
    type: Number,
    default: 0,
  },
  uiuxgrade: {
    type: Number,
    default: 0,
  },
  codegrade: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const users = mongoose.model('Users', usersSchema);

export default users;
