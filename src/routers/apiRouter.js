// api => front/back 통신
import express from 'express';
import { createComment } from '../controllers/commentController';
import { registerView } from '../controllers/videoController';

const apiRouter = express.Router();

apiRouter.post('/videos/:id([0-9a-z]{24})/views', registerView);
apiRouter.post('/videos/:id([0-9a-z]{24})/comment', createComment);

export default apiRouter;