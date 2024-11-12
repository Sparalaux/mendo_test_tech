import express from 'express';
import * as auth from '../middleware/auth.js';
import * as categoryCtr from '../controllers/category.js';

const router = express.Router();

router.post('/', auth.isUserAdmin, categoryCtr.createCategory);

router.get('/', categoryCtr.getCategories);

router.delete('/', auth.isUserAdmin, categoryCtr.deleteCategory);

export default router;