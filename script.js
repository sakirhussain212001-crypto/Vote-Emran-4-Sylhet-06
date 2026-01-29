const texts = [
  "গোলাপগঞ্জে উন্নয়ন",
  "বিয়ানীবাজারে উন্নয়ন",
  "স্বাস্থ্যখাতে উন্নয়ন",
  "শিক্ষাব্যবস্থায় উন্নয়ন",
  "দুর্নীতি প্রতিরোধ",
  "কর্মসংস্থান সৃষ্টি",
  "রাস্তা উন্নয়ন",
  "উন্নত চিকিৎসা ব্যবস্থা"
];

let score = 0;
let timeLeft = 15;
let gameOver = false;

const game = document.getElementById("game");
const runner = document.getElementById("runner");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const scoreCard = document.getElementById("scoreCard");
const finalScore = document.getElementById("finalScore");
const bgMusic = document.getElementById("bgMusic");

/* MUSIC – start on first tap */
let musicStarted = false;
document.body.addEventListener("click", () => {
  if (!musicStarted) {
    bgMusic.play().catch(() => {});
    musicStarted = true;
  }
});

/* COIN CREATION */
function createCoin() {
  if (gameOver) return;

  const coin = document.createElement("div");
  coin.className = "coin";
  coin.innerText = texts[Math.floor(Math.random() * texts.length)];

  const maxTop = game.clientHeight - 40;
  const maxLeft = game.clientWidth - 120;

  coin.style.top = Math.random() * maxTop + "px";
  coin.style.left = Math.random() * maxLeft + "px";

  game.appendChild(coin);

  setTimeout(() => {
    if (coin.parentElement) coin.remove();
  }, 2500);

  coin.addEventListener("click", () => {
    score++;
    scoreEl.innerText = score;
    coin.remove();
  });
}

function startCoins() {
  if (gameOver) return;
  createCoin();
  setTimeout(startCoins, 500 + Math.random() * 1000);
}

/* RUNNER MOVE */
let runnerX = 20;
let dir = 1;
function moveRunner() {
  if (gameOver) return;
  runnerX += dir * 2;
  if (runnerX > game.clientWidth - 50) dir = -1;
  if (runnerX < 0) dir = 1;
  runner.style.left = runnerX + "px";
  requestAnimationFrame(moveRunner);
}

/* TIMER */
const timer = setInterval(() => {
  timeLeft--;
  timeEl.innerText = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    gameOver = true;
    bgMusic.pause();
    finalScore.innerText = score;
    scoreCard.classList.remove("hidden");
  }
}, 1000);

/* START GAME */
startCoins();
moveRunner();
