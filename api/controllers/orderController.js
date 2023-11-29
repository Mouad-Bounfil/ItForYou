import Order from '../models/Order.js';
import { errorHandler } from '../utils/error.js';

export const ordersId = async (req, res ,next) => {
    const customerId = req.params.id;
  
    try {
           
      const orders = await Order.find({ customer_id: customerId });
  
      if (!order) {
        return next(errorHandler(404, 'Order not found'));
      }
  
      res.json({ order, orders });
    } catch (err) {
      next(err);
    }
};


