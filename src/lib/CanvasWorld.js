/**
 * CanvasWorld
 */
export default class CanvasWorld {
  /**
   * @param {Array} canvases - Array of Manifesto:Canvas objects to create a
   * world from.
   */
  constructor(canvases) {
    this.canvases = canvases;
  }

  /** */
  get canvasIds() {
    return this.canvases.map(canvas => canvas.id);
  }

  /**
   * canvasToWorldCoordinates - calculates the canvas coordinates respective to
   * the world.
   */
  canvasToWorldCoordinates(i) {
    const wholeBounds = this.worldBounds();
    const canvas = this.canvases[i];
    const aspectRatio = canvas.getWidth() / canvas.getHeight();
    //const scaledWidth = Math.floor(wholeBounds[3] * aspectRatio);
    const scaledHeight = Math.floor(wholeBounds[2] / aspectRatio);
    //let x = 0;
    let y = 0;
    if (i === 1) {
      //x = wholeBounds[2] - scaledWidth;
      y = wholeBounds[3] - scaledHeight;
    }
    return [
      0,
      y,
      wholeBounds[2],
      scaledHeight,
    ];
  }

  /** */
  indexOfTarget(canvasTarget) {
    return this.canvases.map(canvas => canvas.id).indexOf(canvasTarget);
  }

  /**
   * offsetByCanvas - calculates the offset for a given canvas target. Currently
   * assumes a horrizontal only layout.
   */
  offsetByCanvas(canvasTarget) {
    const offset = { x: 0, y: 0 };
    let i;
    for (i = 0; i < this.indexOfTarget(canvasTarget); i += 1) {
      offset.y += this.canvases[i].getHeight();
    }
    return offset;
  }

  /**
   * worldBounds - calculates the "World" bounds. World in this case is canvases
   * lined up horizontally starting from left to right.
   */
  worldBounds() {
    //const heights = [];
    const widths = [];
    const dimensions = [];
    this.canvases.forEach((canvas) => {
      //heights.push(canvas.getHeight());
      widths.push(canvas.getWidth());
      dimensions.push({
        height: canvas.getHeight(),
        width: canvas.getWidth(),
      });
    });
    //const minHeight = Math.min(...heights);
    const minWidth = Math.min(...widths);
    //let scaledWidth = 0;
    let scaledHeight = 0;
    dimensions.forEach((dim) => {
      const aspectRatio = dim.width / dim.height;
      //scaledWidth += Math.floor(minHeight * aspectRatio);
      scaledHeight += Math.floor(minWidth / aspectRatio);
    });
    return [
      0,
      0,
      minWidth,
      scaledHeight,
    ];
  }
}
