import express from 'express';
import { getDelete, getEdit, getUpload, postEdit, postUpload, watch } from '../controllers/videoController';
import { protectorMiddleware, videoUpload } from '../middlewares';

const router = express.Router();

router.get('/:id([0-9a-z]{24})', watch);

router
  .route('/:id([0-9a-z]{24})/edit')
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit)

router
  .route('/:id([0-9a-z]{24})/delete')
  .all(protectorMiddleware)
  .get(getDelete)
  
router
  .route('/upload')
  .all(protectorMiddleware)
  .get(getUpload)
  .post(videoUpload.single('video'), postUpload)

export default router;

