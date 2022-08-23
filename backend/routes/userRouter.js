import express from 'express'
const router = express.Router();
import { authUser, getUserProfile, registerNewUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../controllers/authController.js'


router
  .route('/createAccount')
  .post(registerNewUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.post('/login', authUser)


export default router;