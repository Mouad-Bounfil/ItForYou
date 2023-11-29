import express from 'express';
import { ordersId } from '../controllers/orderController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/:id', verifyToken, ordersId)


export default router;