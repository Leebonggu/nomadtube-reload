import express from 'express';
import { getEdit, postEdit, remove, see, logout, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from '../controllers/userController';
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from '../middlewares';

const router = express.Router();

router.get('/logout', protectorMiddleware, logout);
router
.route('/edit')
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single('avatar'), postEdit);
router.route('/change-password')
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
router.get('/github/start', publicOnlyMiddleware, startGithubLogin);
router.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
router.get('/delete', remove);
router.get('/:id', see);

export default router;

