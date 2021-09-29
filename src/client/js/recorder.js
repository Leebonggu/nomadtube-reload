const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

let stream, recorder, videoFile;

const handleDownload = () => {
  const a= document.createElement('a');
  a.href = videoFile;
  a.download = 'My Recording.webm';
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener('click', handleStop);
  startBtn.addEventListener('click', handleDownload);
  recorder.stop();
}

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener('click', handleStart);
  startBtn.addEventListener('click', handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    const { data } = event;
    videoFile = URL.createObjectURL(data) // 메모리에서만 가능한 URL. 브라우저상의 메모리에 저장됨
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
}

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
      // audio: true,
      video: { width: 200, height: 100 },
    });
  // startBtn.innerText = "Stop Recording";
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener('click', handleStart);