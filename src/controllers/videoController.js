import User from '../models/User';
import Video from '../models/Video';

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: 'desc' })
    .populate("owner");
  return res.render('home', { pageTitle: 'Home' , videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate('owner').populate('comments');
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  return res.render('watch', { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const { user : { _id }} = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash('error', 'Not authrized');
    return res.status(403).redirect('/');
  }
  return res.render('edit', { pageTitle: `Editing`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { user : { _id }} = req.session;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  const { title, description, hashtags } = req.body;
  const updateddVideo = await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags)
  });
  if (String(updateddVideo.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  req.flash('success', 'Change saved');
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render('upload');
};

export const postUpload = async (req, res) => {
  const { user: { _id } } = req.session;
  const { location, path } = req.file;
  const { title, description, hashtags } = req.body;

  const isHeroku = process.env.NODE_ENV === 'production';

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: isHeroku ? location : path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags)
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect(`/`);
  } catch (error) {
    return  res.status(400).render('upload', { pageTitle: `Upload Video`, errorMessage: error._message})
  }
};

export const getDelete = async (req, res) => {
  const { id } = req.params;
  const { user : { _id }} = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }

  await Video.findByIdAndDelete(id);
  return res.redirect('/');
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render('search', { pageTitle: 'Search', videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findByIdAndUpdate(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views += 1;
  await video.save();
  return res.sendStatus(200);
};
