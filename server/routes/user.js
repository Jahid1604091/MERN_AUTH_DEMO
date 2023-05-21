import express from 'express';
import { auth_user, register } from '../controllers/user.js';
const router = express.Router();

router.post('/',register);
router.post('/auth',auth_user);

export default router;