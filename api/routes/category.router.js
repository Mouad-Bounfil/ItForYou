import express from 'express';
import { createCategory, getCategoryList, getCategory, updateCategory, deleteCategory } from '../controllers/categorcontroler.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', verifyToken, createCategory);
router.get('/', getCategoryList);
router.get('/:id', getCategory);
router.put('/:id', verifyToken, updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;
