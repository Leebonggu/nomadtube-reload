import express from 'express';
import { home, search } from '../controllers/videoController';
import { getJoin, postJoin, postLogin, getLogin } from '../controllers/userController';
import { publicOnlyMiddleware } from '../middlewares';

const router = express.Router();

router.get('/', home);
router
  .route('/join')
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(postJoin)
router
  .route('/login')
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin)
router.get('/search', search);

export default router;