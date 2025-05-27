export class Background extends PIXI.TilingSprite {
  private scrollSpeed: number;

  constructor(app: PIXI.Application) {
    // Create a placeholder graphic for the background
    const placeholder = new PIXI.Graphics();

    // Main background color (blue)
    placeholder.beginFill(0x3498db); // A nice blue color
    placeholder.drawRect(0, 0, app.screen.width, app.screen.height);
    placeholder.endFill();

    // Add some lighter blue vertical stripes
    placeholder.beginFill(0x85c1e9); // Lighter blue
    const stripeWidth = 20;
    const stripeSpacing = 50;
    for (let x = 0; x < app.screen.width; x += stripeWidth + stripeSpacing) {
      placeholder.drawRect(x, 0, stripeWidth, app.screen.height);
    }
    placeholder.endFill();

    // Generate a texture from the graphics object
    // The texture should be the size of the screen for TilingSprite
    const texture = app.renderer.generateTexture(placeholder, PIXI.SCALE_MODES.LINEAR, 1, new PIXI.Rectangle(0,0, app.screen.width, app.screen.height));

    super(texture, app.screen.width, app.screen.height);

    this.scrollSpeed = 1.5; // Adjust this value to change scroll speed

    // Position the TilingSprite at the top-left corner
    this.x = 0;
    this.y = 0;
  }

  public update(delta: number): void {
    // Move the tile position to create the scrolling effect
    this.tilePosition.x += this.scrollSpeed * delta;
  }
}
