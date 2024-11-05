// Game variables
let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY;
let score = 0;
let hits = 0;
let obstacleSpeed = 2;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width / 2;
  playerY = height - 20;
  
  // Initialize positions for coin and obstacle
  newCoin();
  resetObstacle();
  
  // Reset game variables
  score = 0;
  hits = 0;
  obstacleSpeed = 2;
  gameOver = false;
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 10);
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

function movePlayer() {
  // Basic left/right movement with boundary checking
  if (keyIsDown(LEFT_ARROW) && playerX > 0) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW) && playerX < width) {
    playerX += 5;
  }
  
  // Up/down movement with boundary checking
  if (keyIsDown(UP_ARROW) && playerY > 0) {
    playerY -= 5;
  }
  if (keyIsDown(DOWN_ARROW) && playerY < height) {
    playerY += 5;
  }
}

function moveObstacle() {
  // Move obstacle from top to bottom
  obstacleY += obstacleSpeed;
  
  // Reset obstacle when it goes off screen and increase speed
  if (obstacleY > height) {
    resetObstacle();
    obstacleSpeed += 0.5; // Increase speed each time it resets
  }
}

function resetObstacle() {
  // Reset obstacle to the top with a random X position
  obstacleY = 0;
  obstacleX = random(20, width - 20);
}

function checkCoinCollection() {
  // Check if player collects the coin
  if (dist(playerX, playerY, coinX, coinY) < 15) {
    score++;
    randomizePositions(); // Move all elements to random locations
    obstacleSpeed += 0.5; // Increase obstacle speed slightly
  }
}

function checkCollisions() {
  // Check if player hits the obstacle
  if (dist(playerX, playerY, obstacleX, obstacleY) < 20) {
    hits++;
    
    if (hits >= 3) {
      gameOver = true;
    } else {
      randomizePositions(); // Move all elements to random locations
      // Reset player to starting position on collision
      playerX = width / 2;
      playerY = height - 20;
    }
  }
}

function displayStats() {
  fill(0);
  textSize(16);
  text("Score: " + score, 10, 20);
  text("Hits: " + hits, 10, 40);
  text("Speed: " + obstacleSpeed, 10, 60);
}

function displayGameOver() {
  // Show game over screen with final score and restart instructions
  background(220);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 20);
  textSize(20);
  text("Score: " + score, width / 2, height / 2 + 20);
  text("Press 'R' to Restart", width / 2, height / 2 + 50);
}

function newCoin() {
  // Generate a new random position for the coin
  coinX = random(20, width - 20);
  coinY = random(20, height - 20);
}

function randomizePositions() {
  // Randomize positions of player, coin, and obstacle
  playerX = random(20, width - 20);
  playerY = random(20, height - 20);
  newCoin(); // Generate new random position for coin
  resetObstacle(); // Reset obstacle to random X position at the top
}

function keyPressed() {
  // Reset game when 'R' key is pressed
  if (gameOver && (key === 'r' || key === 'R')) {
    initializeGame();
  }
}
