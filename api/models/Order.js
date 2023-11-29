import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Types.ObjectId,
   },
  userId: { 
    type: mongoose.Types.ObjectId,
    ref:'User',
    required: true
 },

 status: {
  type: String,
  enum: ["pending", "completed"],
  default: "pending", // Set default to one of the values in the enum or omit for `null`
},
  costumerId:{
    type: mongoose.Types.ObjectId,
    ref:'Costumer',
    required: true

  },
  date: { type: Date, default: Date.now },

  initOrderId:{
    id: {
      type: String,
      unique: true, // Ensure the identifier is unique
    },
    status: {
      type: Boolean,
      default: false
    },
  },

  finishedOrderId:{ 
    id: {
      type: String,
      unique: true, // Ensure the identifier is unique
    },
    status: {
      type: Boolean,
      default: false
    },
  },

  ConfirmedOrderId:{
    id: {
      type: String,
      unique: true, // Ensure the identifier is unique
    },
    status: {
      type: Boolean,
      default: false
    },
  },
  DeliveredOrderId:{
    id: {
      type: String,
      unique: true, // Ensure the identifier is unique
    },
    status: {
      type: Boolean,
      default: false
    },
  }


  // Additional properties related to transactions...
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

  