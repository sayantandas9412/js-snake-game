import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  snakeIntersection,
  getSnakeHead,
} from "./snake.js";

import { outsideGridSize } from "./grid.js";
import { update as updateFood, draw as drawFood } from "./food.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lost ! Do you want to continue ?")) {
      window.location = "./";
    }
    return;
  }
  window.requestAnimationFrame(main);
  const secSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGridSize(getSnakeHead()) || snakeIntersection();
}
