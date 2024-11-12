import express from 'express';
import * as auth from '../middleware/auth.js';
import * as userCtr from '../controllers/user.js';

const router = express.Router();

router.post('/signup', userCtr.createUser);

router.post('/login', userCtr.logUser);

router.patch('/', auth.isUserIsHimselfOrAdmin, userCtr.modifyUser);

router.get('/', auth.isUserConnected, userCtr.getUsers);

router.get('/:id', auth.isUserConnected, userCtr.getUser)

router.delete('/', auth.isUserIsHimselfOrAdmin, userCtr.deleteUser);

export default router;