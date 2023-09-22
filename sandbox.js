const webcam = document.querySelector(".webcam");
const video = document.querySelector(".video");
const vctx = video.getContext("2d");
const face = document.querySelector(".face");
const fctx = face.getContext("2d");

const faceDetector = new FaceDetector();

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: 780,
      height: 520,
    },
  });
  console.log(stream);
  webcam.srcObject = stream;
  console.log(webcam);
  await webcam.play();
  face.width = webcam.videoWidth;
  face.height = webcam.videoHeight;
  video.width = webcam.videoWidth;
  video.height = webcam.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(webcam);
  faces.forEach((face) => {
    buildFace(face);
  });
  requestAnimationFrame(detect);
}

function buildFace(face) {
  const { width, height, left, top } = face.boundingBox;
  vctx.clearRect(0, 0, video.width, video.height);
  vctx.strokeStyle = "#FFEE75";
  vctx.lineWidth = 1;
  vctx.strokeRect(left, top, width, height);
  console.log(face);
}

populateVideo().then(detect);
