import express from 'express';
import { auth_user } from '../controllers/user.js';
const router = express.Router();

router.post('/auth',auth_user);

export default router;