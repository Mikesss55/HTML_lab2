/**
 * Memory Game - Flip Card Matching Game
 * Features: Dynamic card generation, difficulty levels, statistics tracking
 */

// Card data - using Bootstrap Icons for card content
const cardData = [
  { id: 1, icon: 'bi-heart-fill', name: 'heart' },
  { id: 2, icon: 'bi-star-fill', name: 'star' },
  { id: 3, icon: 'bi-lightning-fill', name: 'lightning' },
  { id: 4, icon: 'bi-sun-fill', name: 'sun' },
  { id: 5, icon: 'bi-moon-fill', name: 'moon' },
  { id: 6, icon: 'bi-cloud-fill', name: 'cloud' },
  { id: 7, icon: 'bi-gift-fill', name: 'gift' },
  { id: 8, icon: 'bi-trophy-fill', name: 'trophy' },
  { id: 9, icon: 'bi-gem', name: 'gem' },
  { id: 10, icon: 'bi-fire', name: 'fire' },
  { id: 11, icon: 'bi-balloon-fill', name: 'balloon' },
  { id: 12, icon: 'bi-flower1', name: 'flower' }
];

// Game state
let gameState = {
  difficulty: 'easy',
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  moves: 0,
  gameStarted: false,
  canFlip: true
};

// DOM Elements
const gameBoard = document.getElementById('game-board');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const movesCount = document.getElementById('moves-count');
const matchesCount = document.getElementById('matches-count');
const winMessage = document.getElementById('win-message');
const finalMoves = document.getElementById('final-moves');

// Initialize event listeners
function initEventListeners() {
  difficultySelect.addEventListener('change', handleDifficultyChange);
  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', restartGame);
}

// Handle difficulty change
function handleDifficultyChange() {
  if (gameState.gameStarted) {
    if (confirm('Changing difficulty will restart the game. Continue?')) {
      gameState.difficulty = difficultySelect.value;
      restartGame();
    } else {
      // Revert to current difficulty
      difficultySelect.value = gameState.difficulty;
    }
  } else {
    gameState.difficulty = difficultySelect.value;
  }
}

// Get grid configuration based on difficulty
function getGridConfig() {
  if (gameState.difficulty === 'easy') {
    return { rows: 3, cols: 4, pairs: 6 };
  } else {
    return { rows: 4, cols: 6, pairs: 12 };
  }
}

// Generate card pairs
function generateCards() {
  const config = getGridConfig();
  const selectedCards = cardData.slice(0, config.pairs);
  
  // Create pairs
  const cardPairs = [...selectedCards, ...selectedCards];
  
  // Shuffle cards
  return shuffleArray(cardPairs);
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Create card element
function createCardElement(cardInfo, index) {
  const card = document.createElement('div');
  card.className = 'memory-card';
  card.dataset.cardId = cardInfo.id;
  card.dataset.cardName = cardInfo.name;
  card.dataset.index = index;
  
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <i class="bi bi-question-circle-fill"></i>
      </div>
      <div class="card-back">
        <i class="${cardInfo.icon}"></i>
      </div>
    </div>
  `;
  
  card.addEventListener('click', () => handleCardClick(card, index));
  
  return card;
}

// Render game board
function renderGameBoard() {
  const config = getGridConfig();
  
  // Clear board
  gameBoard.innerHTML = '';
  
  // Set grid layout
  gameBoard.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;
  
  // Generate and add cards
  gameState.cards = generateCards();
  gameState.cards.forEach((cardInfo, index) => {
    const cardElement = createCardElement(cardInfo, index);
    gameBoard.appendChild(cardElement);
  });
}

// Handle card click
function handleCardClick(card, index) {
  // Check if card can be flipped
  if (!gameState.gameStarted || !gameState.canFlip) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
  if (gameState.flippedCards.length >= 2) return;
  
  // Flip the card
  card.classList.add('flipped');
  gameState.flippedCards.push({ card, index });
  
  // Check if two cards are flipped
  if (gameState.flippedCards.length === 2) {
    gameState.canFlip = false;
    gameState.moves++;
    updateStats();
    checkForMatch();
  }
}

// Check if flipped cards match
function checkForMatch() {
  const [first, second] = gameState.flippedCards;
  const firstCard = gameState.cards[first.index];
  const secondCard = gameState.cards[second.index];
  
  if (firstCard.id === secondCard.id) {
    // Match found
    setTimeout(() => {
      first.card.classList.add('matched');
      second.card.classList.add('matched');
      gameState.matchedPairs++;
      updateStats();
      gameState.flippedCards = [];
      gameState.canFlip = true;
      
      // Check for win
      checkForWin();
    }, 500);
  } else {
    // No match - flip back
    setTimeout(() => {
      first.card.classList.remove('flipped');
      second.card.classList.remove('flipped');
      gameState.flippedCards = [];
      gameState.canFlip = true;
    }, 1000);
  }
}

// Update statistics display
function updateStats() {
  movesCount.textContent = gameState.moves;
  matchesCount.textContent = gameState.matchedPairs;
}

// Check for win condition
function checkForWin() {
  const config = getGridConfig();
  if (gameState.matchedPairs === config.pairs) {
    setTimeout(() => {
      showWinMessage();
    }, 500);
  }
}

// Show win message
function showWinMessage() {
  finalMoves.textContent = gameState.moves;
  winMessage.style.display = 'block';
  winMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide win message
function hideWinMessage() {
  winMessage.style.display = 'none';
}

// Start game
function startGame() {
  gameState.gameStarted = true;
  gameState.moves = 0;
  gameState.matchedPairs = 0;
  gameState.flippedCards = [];
  gameState.canFlip = true;
  
  hideWinMessage();
  updateStats();
  renderGameBoard();
  
  startBtn.disabled = true;
  restartBtn.disabled = false;
  difficultySelect.disabled = false;
}

// Restart game
function restartGame() {
  gameState.moves = 0;
  gameState.matchedPairs = 0;
  gameState.flippedCards = [];
  gameState.canFlip = true;
  
  hideWinMessage();
  updateStats();
  renderGameBoard();
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  
  // Show initial empty state or placeholder
  gameBoard.innerHTML = '<div class="game-placeholder"><p>Click "Start Game" to begin!</p></div>';
});
