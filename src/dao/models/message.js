import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define el esquema del mensaje
const messageSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Crea el modelo 'Message' utilizando el esquema definido
const Message = mongoose.model('Message', messageSchema);

export default Message;