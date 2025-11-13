let canvas;
let parentContainer;

let paddleLeftX = 20;
let paddleLeftY = 80;

let paddleRightX = 380;
let paddleRightY = 80;

let paddleSpeed = 5;
let paddleHeight = 80;
let paddleWidth = 10;

let leftScore = 0;
let rightScore = 0;

let ballPosX;
let ballPosY;
let ballSpeedX = 0;
let ballSpeedY = 0;
let ballSize = 10;

function setup() {
  // 1. Get a reference to the parent element (assuming it has an ID 'my-container')
  parentContainer = document.getElementById('p5js');

  // Check if the container exists
  if (parentContainer) {
    // 2. Get the parent's width
    const containerWidth = parentContainer.offsetWidth;
    const containerHeight = 200; // You can set a fixed height or also get it from the parent

    paddleRightX = containerWidth - 20;
    ballPosX = containerWidth / 2 - ballSize / 2;
    ballPosY = containerHeight / 2 - ballSize / 2;

    // 3. Create the canvas with the parent's width
    canvas = createCanvas(containerWidth, containerHeight);

    // 4. Attach the canvas to the parent
    canvas.parent(parentContainer);
  } else {
    console.error("Parent container with ID 'my-container' not found.");
    // Fallback or handle the error as needed

    paddleRightX = 380;
    canvas = createCanvas(400, 400); // Create a default canvas
  }

  rectMode(CENTER);

  noStroke();
  textSize(40);
  textAlign(CENTER);

  resetBall();
  // Start paused
  describe(
    'Two narrow white rectangles and a white square representing the paddles and ball in a game of ping pong. The player scores are displayed in the upper corners, and initially text reads "Click to start"'
  );
}

function draw() {
  clear();

  // Draw the paddles
  fill("#7fbbdd")

  rect(paddleLeftX, paddleLeftY, paddleWidth, paddleHeight);

  fill("#7fbbdd")
  rect(paddleRightX, paddleRightY, paddleWidth, paddleHeight);

  // Draw the ball
  fill("#d79921")
  square(ballPosX, ballPosY, ballSize);

  // Draw the score
  // text(leftScore, width * 0.25, height * 0.1);
  // text(rightScore, width * 0.75, height * 0.1);
  //
  // Move the ball using its current speed
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;

  // Store coordinates of the left paddle's collision area edges
  let leftCollisionLeft = paddleLeftX - paddleWidth / 2 - ballSize / 2;
  let leftCollisionRight = paddleLeftX + paddleWidth / 2 + ballSize / 2;
  let leftCollisionTop = paddleLeftY - paddleHeight / 2 - ballSize / 2;
  let leftCollisionBottom = paddleLeftY + paddleHeight / 2 + ballSize / 2;

  // If the ball is colliding with the left paddle
  if (
    ballPosX >= leftCollisionLeft &&
    ballPosX <= leftCollisionRight &&
    ballPosY >= leftCollisionTop &&
    ballPosY <= leftCollisionBottom
  ) {
    // Reverse the ball's horizontal speed
    ballSpeedX = -ballSpeedX;

    // Change the ball's vertical speed so it appears to bounce off the paddle
    ballSpeedY = (ballPosY - paddleLeftY) / 20;
    ballSpeedY = random([-3, 3])
  }

  // Store coordinates of the right paddle's collision area edges
  let rightCollisionLeft = paddleRightX - paddleWidth / 2 - ballSize / 2;
  let rightCollisionRight = paddleRightX + paddleWidth / 2 + ballSize / 2;
  let rightCollisionTop = paddleRightY - paddleHeight / 2 - ballSize / 2;
  let rightCollisionBottom = paddleRightY + paddleHeight / 2 + ballSize / 2;

  // If the ball is colliding with the right paddle
  if (
    ballPosX >= rightCollisionLeft &&
    ballPosX <= rightCollisionRight &&
    ballPosY >= rightCollisionTop &&
    ballPosY <= rightCollisionBottom
  ) {
    // Reverse the ball's horizontal speed
    ballSpeedX = -ballSpeedX;

    // Change the ball's vertical speed so it appears to bounce off the paddle
    ballSpeedY = (ballPosY - paddleRightY) / 20;
    ballSpeedY = random([-3, 3])
  }

  // If the ball is beyond the left edge
  if (ballPosX < 0) {
    // Give the right player a point
    rightScore += 1;
    resetBall();

    // Otherwise if the ball is beyond the right edge
  } else if (ballPosX > width) {
    // Give the left player a point
    leftScore += 1;
    resetBall();

    // Otherwise if the ball is hitting the top or bottom edge
  } else if (ballPosY < 0 || ballPosY > height) {
    // Reverse its vertical speed
    ballSpeedY = -ballSpeedY;
  }

  // Store how much the left paddle will move
  let leftMove = 0;

  if (ballPosX < width / 2) {
    if (ballPosY > paddleLeftY) {
      leftMove += paddleSpeed;
    }
    if (ballPosY < paddleLeftY) {
      leftMove -= paddleSpeed;
    }
  }

  // Prevent the paddle from moving off screen
  paddleLeftY = constrain(
    paddleLeftY + leftMove,
    paddleHeight / 2,
    height - paddleHeight / 2
  );


  // Store how much the right paddle will move
  let rightMove = 0;

  if (ballPosX > width / 2) {
    if (ballPosY > paddleRightY) {
      rightMove += paddleSpeed;
    }
    if (ballPosY < paddleRightY) {
      rightMove -= paddleSpeed;
    }
  }

  // Prevent the paddle from moving off screen
  paddleRightY = constrain(
    paddleRightY + rightMove,
    paddleHeight / 2,
    height - paddleHeight / 2
  );

  // Show 'Click to start' if game is paused
  // if (isLooping() === false) {
  //   text('Click to start', width / 2, height / 2 - 20);
  // }
}

// Reset ball to center of canvas with random speed
function resetBall() {
  ballPosX = width / 2;
  ballPosY = height / 2;
  ballSpeedX = random([-3, 3]);
  ballSpeedY = random([-1, 1]);
}

// Optional: Handle resizing if the parent element's size can change
function windowResized() {
  if (parentContainer) {
    const newContainerWidth = parentContainer.offsetWidth;
    const newContainerHeight = 200; // Or dynamically get height

    paddleRightX = newContainerWidth - 20;

    resizeCanvas(newContainerWidth, newContainerHeight);
  }
}

window.addEventListener(windowResized);
