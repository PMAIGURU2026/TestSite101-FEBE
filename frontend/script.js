// Branding and navigation logic for WURDSMYTH.AI
const startForm = document.getElementById('start-form');
const gameSection = document.getElementById('game');
const progressSection = document.getElementById('progress');
const homeSection = document.querySelector('.home');
const progressBtn = document.getElementById('progress-btn');
const promptSpan = document.getElementById('prompt');

const prompts = [
  "You're doing well!",
  "I missed you!",
  "I'm glad you came back!",
  "Let's build on your skills!",
  "You are a phenomenal reader!",
  "Congratulations, you are now an expert!",
  "Congratulations, you are now intermediate!",
  "Congratulations, you are now proficient!"
];

function showPrompt() {
  promptSpan.textContent = prompts[Math.floor(Math.random() * prompts.length)];
}

progressBtn.addEventListener('click', () => {
  homeSection.classList.add('hidden');
  gameSection.classList.add('hidden');
  progressSection.classList.remove('hidden');
  renderProgress();
});

startForm.addEventListener('submit', (e) => {
  e.preventDefault();
  homeSection.classList.add('hidden');
  progressSection.classList.add('hidden');
  gameSection.classList.remove('hidden');
  showPrompt();
  startGame();
});

function startGame() {
  // Placeholder: fetch words and render cloze activity
  gameSection.innerHTML = `<h2>Cloze Activity</h2><p>Game logic will appear here.</p>`;
}

function renderProgress() {
  // Placeholder: show 3500 stars, grey out learned
  let stars = '';
  for (let i = 0; i < 3500; i++) {
    stars += `<span class="star${i % 10 === 0 ? ' greyed' : ''}"></span>`;
  }
  progressSection.innerHTML = `<h2>Your Progress</h2><div>${stars}</div>`;
}

// Initial state
gameSection.classList.add('hidden');
progressSection.classList.add('hidden');

