import * as PIXI from 'pixi.js';

export class Bird extends PIXI.Sprite {
  public vy: number;
  private gravity: number;

  constructor(app: PIXI.Application) {
    // Create a placeholder graphic (a simple red square)
    const placeholder = new PIXI.Graphics();
    placeholder.beginFill(0xFF0000); // Red color
    placeholder.drawRect(0, 0, 50, 50); // x, y, width, height
    placeholder.endFill();

    // Generate a texture from the graphics object
    const texture = app.renderer.generateTexture(placeholder, PIXI.SCALE_MODES.LINEAR, app.renderer.resolution);

    super(texture);

    this.vy = 0;
    this.gravity = 0.5; // Adjust this value to change the strength of gravity

    // Position the bird initially (e.g., center-left of the screen)
    this.x = app.screen.width / 4;
    this.y = app.screen.height / 2;

    this.anchor.set(0.5); // Set anchor to the center of the sprite
  }

  public update(delta: number): void {
    // Apply gravity
    this.vy += this.gravity * delta;
    // Update position
    this.y += this.vy * delta;
  }

  public flap(): void {
    // Set vertical velocity to a negative value to make the bird jump
    this.vy = -10; // Adjust this value to change the jump height
  }
}
