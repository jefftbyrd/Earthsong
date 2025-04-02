export const clouds = (p5) => {
  const tileCount = 100;
  const noiseScale = 0.03;

  let noiseVector;
  let noiseVelocity;
  let noiseAcceleration;
  let button;
  let startTime;
  let showStartScreen = false;

  let initialSkyColor;
  let targetSkyColor;
  let initialCloudColor;
  let targetCloudColor;

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // p5.position.canvas;
    canvas.position(0, 0);

    // Initialize vectors for moving noise field
    noiseVector = p5.createVector(0, 0); // Starting position
    noiseVelocity = p5.createVector(0.03, 0); // Initial velocity moves from left to right
    noiseAcceleration = p5.createVector(
      p5.random(-0.005, 0.005),
      p5.random(-0.005, 0.005),
    ); // Small acceleration for drift

    // Initialize colors
    initialSkyColor = p5.color(150, 180, 255);
    targetSkyColor = p5.color(0, 50, 150);
    initialCloudColor = p5.color(252, 230, 252);
    targetCloudColor = p5.color(255, 105, 180);
    startTime = p5.millis();
  };

  p5.updateWithProps = (props) => {
    if (props.phase === 'portal' || props.phase === 'portalRecall') {
      stopAll();
    }
  };

  p5.draw = () => {
    // Show screen
    if (showStartScreen) {
      p5.background(252, 230, 252);
      button.show();

      // After button is pressed
    } else {
      // Calculate the progress over 30 seconds
      let timeElapsed = p5.millis() - startTime;
      let progress = p5.constrain(timeElapsed / 30000, 0, 1);

      // Change sky and cloud colors based on the progress
      let currentSkyColor = p5.lerpColor(
        initialSkyColor,
        targetSkyColor,
        progress,
      );
      let currentCloudColor = p5.lerpColor(
        initialCloudColor,
        targetCloudColor,
        progress,
      );

      // Set the background to the interpolated sky color
      // p5.background(currentSkyColor);
      p5.clear();

      // Update the noise field
      noiseVelocity.add(noiseAcceleration);
      noiseVector.sub(noiseVelocity);

      // Move noise field slightly in all directions
      noiseAcceleration.x = p5.random(-0.0005, 0.0005);
      noiseAcceleration.y = p5.random(-0.0005, 0.0005);

      // Calculate size of tiles
      let tileSize = p5.width / tileCount;
      for (let row = 0; row < tileCount; row++) {
        for (let col = 0; col < tileCount; col++) {
          let x = col * tileSize;
          let y = row * tileSize;

          // Calculate Perlin noise value based on noiseVector and grid position
          let xnoise = noiseVector.x + col * noiseScale;
          let ynoise = noiseVector.y + row * noiseScale;
          let noiseValue = p5.noise(xnoise, ynoise);

          // Map noise to opacity to create cloud transparency with a value
          let a = p5.map(noiseValue, 0, 0.5, 0, 210);
          p5.fill(
            currentCloudColor.levels[0],
            currentCloudColor.levels[1],
            currentCloudColor.levels[2],
            a,
          );

          // Draw tiles
          p5.noStroke();
          p5.rect(x, y, tileSize, tileSize);
        }
      }
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  function stopAll() {
    // console.log('stop triggered');
    // p5.removeElements();
    // await multiPlayer.stopAll();
    // await multiPlayer.dispose();
    // multiPlayer = new Tone.Players();
    p5.remove();
  }
};
