import express from 'express';
import * as auth from '../middleware/auth.js';
import * as bookCtr from '../controllers/book.js';

const router = express.Router();

router.post('/', auth.isUserAdmin, bookCtr.addBook);

router.patch('/', auth.isUserAdmin, bookCtr.modifyBook);

router.delete('/', auth.isUserAdmin, bookCtr.deleteBook);

router.get('/', bookCtr.getBooks);

router.get('/:id', bookCtr.getBook);

router.get('/category/:name', bookCtr.getBookWithCategory);

// router.post('/bookinator', bookCtr.bookinator);

export default router;