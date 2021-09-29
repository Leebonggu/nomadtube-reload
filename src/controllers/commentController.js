import Video from '../models/Video';
import Comment from '../models/Comment';

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;
  
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404); // kill request
  }
  
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();

  return res.status(201).json({ newCommentId: comment._id });
};