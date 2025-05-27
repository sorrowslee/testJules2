import * as PIXI from 'pixi.js';
import { Bird } from './Bird';
import { Background } from './Background';

// Create a PixiJS application
const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(app.view);

  // Create and add the scrolling background
  const background = new Background(app);
  app.stage.addChild(background);

  // Create a bird instance
  const bird = new Bird(app);
  app.stage.addChild(bird);

  // Add mouse click listener to make the bird flap
  window.addEventListener('click', () => {
    bird.flap();
  });

  let isGameOver = false;
  let gameOverText: PIXI.Text | null = null;
  let score = 0;
  let scoreText: PIXI.Text;

  // Create and add score text
  scoreText = new PIXI.Text(`Score: ${score}`, {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xffffff, // White color
    align: 'left',
    stroke: '#000000',
    strokeThickness: 3
  });
  scoreText.x = 10;
  scoreText.y = 10;
  app.stage.addChild(scoreText);

  // Add bird's and background's update to the ticker
  app.ticker.add((delta) => {
    if (!isGameOver) {
      // Update game elements
      background.update(delta);
      bird.update(delta);

      // Increment score and update display
      score += 1; // Increment score by 1 each frame (can be tuned)
      scoreText.text = `Score: ${score}`;

      // Check for game over condition
      // Bird's anchor is 0.5, so its y is its center.
      // The condition checks if the top of the bird is below the screen,
      // or if the bottom of the bird is below the screen.
      // A simpler check is if bird.y (center) - bird.height/2 (top edge) > app.screen.height
      // or more simply, if bird.y (center) > app.screen.height + bird.height / 2 (completely off screen)
      // However, usually, game over is when the bird is mostly off-screen or hits the "floor".
      // Let's consider game over when the bird's center hits the bottom edge.
      if (bird.y + bird.height / 2 > app.screen.height) {
        isGameOver = true;

        // Display Game Over message
        if (!gameOverText) {
          gameOverText = new PIXI.Text('Game Over', {
            fontFamily: 'Arial',
            fontSize: 64,
            fill: 0xff1010, // Red color
            align: 'center',
            stroke: '#000000',
            strokeThickness: 5
          });
          gameOverText.anchor.set(0.5);
          gameOverText.x = app.screen.width / 2;
          gameOverText.y = app.screen.height / 2;
          app.stage.addChild(gameOverText);
        }
      }
    }
  });
});

// Remove the placeholder graphics object as it's no longer needed
// const graphics = new PIXI.Graphics();
// graphics.beginFill(0xFF3300);
// graphics.drawCircle(400, 300, 50);
// graphics.endFill();
// app.stage.addChild(graphics);
