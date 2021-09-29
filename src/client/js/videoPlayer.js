const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById('mute');
const muteBtnIcon = muteBtn.querySelector("i");
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('volume');
const timeline = document.getElementById('timeline');
const fullScreenBtn = document.getElementById('fullScreen');
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById('videoContainer');
const videoControls = document.getElementById('videoControls');

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
video.removeAttribute('controls');

const handlePlayClick = (e) => {
  // if video is plaing, pause it
  // else play video
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
  ? "fas fa-volume-mute"
  : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const { target: { value } } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTIme = (seconds) => {
  if (seconds >= 3600) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }
  return new Date(seconds * 1000).toISOString().substr(14, 5);
};

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTIme(Math.floor(video.duration));
  timeline.setAttribute('max', Math.floor(video.duration));
};

const handleTimeUpdate = () => {
  // new Date(Math.floor(video.currentTime) * 1000).toISOString().substr(11, 8)
  currentTime.innerText = formatTIme(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (e) => {
  const {
    target: {
      value
    }
  } = e;
  timeline.value = value;
  video.currentTime = value;
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/views`, {
    method: 'POST',
  });
}

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand"
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress"
  }
};

const hideControls = () => videoControls.classList.remove('showing');

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add('showing');
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

document.onkeydown = function(e) {
  if (e.code === 'Space' && video.paused) {
    video.play();
  } else if (e.code === 'Space' && !video.paused) {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
timeline.addEventListener('input', handleTimelineChange);
fullScreenBtn.addEventListener('click', handleFullScreen);
video.addEventListener('loadeddata', handleLoadedMetaData);
video.addEventListener('timeupdate', handleTimeUpdate);
video.addEventListener('ended', handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);