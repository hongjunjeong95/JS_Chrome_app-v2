const body = document.querySelector('body');

const IMG_NUMBER = 3;

const genRandom = () => {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
};

const paintImage = (imgNumber) => {
  body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
  url('../images/com/bg${imgNumber + 1}.jpg')`;
  body.classList.add('bgImage');
};

const bgAnimation = () => {
  const randomNumber = genRandom();
  paintImage(randomNumber);
};

function init() {
  setInterval(bgAnimation, 6000);
}

init();
