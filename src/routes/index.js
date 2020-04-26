import express from 'express';

// User controller
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controller/userController';

// init express router
const router = express.Router();

// Home
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to HashiTalk Africa',
  });
});

/***************************************************
 *                 Users Routes                    *
 ***************************************************/
router.post('/user', createUser);
router.route('/user/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
