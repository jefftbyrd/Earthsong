export const clouds = (p5) => {
  // Keep original tile count but slightly reduced
  const tileCount = 50; // Reduced from 100 but still enough for detail
  const noiseScale = 0.05; // Original noise scale

  let noiseVector;
  let noiseVelocity;
  let noiseAcceleration;
  let button;
  let startTime;

  let initialSkyColor;
  let targetSkyColor;
  let initialCloudColor;
  let targetCloudColor;

  // Graphics buffer for cloud rendering
  let cloudBuffer;

  // Flag to track if sketch has been disposed
  let isDisposed = false;

  // Add these variables at the top with other declarations
  let currentWidth;
  let currentHeight;

  p5.setup = () => {
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); // Ensure canvas stays behind other elements

    p5.frameRate(15); // Reduce from 30 to 15

    // Create graphics buffer at half resolution for performance
    cloudBuffer = p5.createGraphics(
      Math.floor(p5.windowWidth / 2),
      Math.floor(p5.windowHeight / 2),
    );
    cloudBuffer.pixelDensity(1); // Force lower density for performance

    // Initialize vectors for moving noise field
    noiseVector = p5.createVector(0, 0);
    noiseVelocity = p5.createVector(0.02, 0);
    noiseAcceleration = p5.createVector(
      p5.random(-0.005, 0.005),
      p5.random(-0.005, 0.005),
    );

    // Initialize colors
    initialSkyColor = p5.color(150, 180, 255);
    targetSkyColor = p5.color(0, 50, 150);
    initialCloudColor = p5.color(252, 230, 252);
    targetCloudColor = p5.color(255, 105, 180);
    startTime = p5.millis();

    // Store initial dimensions
    currentWidth = p5.windowWidth;
    currentHeight = p5.windowHeight;
  };

  p5.updateWithProps = (props) => {
    // Check if canvas needs resize on mount/update
    if (p5.width !== p5.windowWidth || p5.height !== p5.windowHeight) {
      p5.windowResized();
    }

    if (props.phase === 'portal' || props.phase === 'portalRecall') {
      stopAll();
    }

    // Add explicit disposal if requested
    if (props.dispose === true && !isDisposed) {
      stopAll();
    }
  };

  p5.draw = () => {
    // Skip drawing if disposed
    if (isDisposed) return;

    // Calculate the progress over 30 seconds
    let timeElapsed = p5.millis() - startTime;
    let progress = p5.constrain(timeElapsed / 30000, 0, 1);

    // Change cloud colors based on the progress
    let currentCloudColor = p5.lerpColor(
      initialCloudColor,
      targetCloudColor,
      progress,
    );

    // Clear main canvas
    p5.clear();

    // Clear buffer canvas
    if (cloudBuffer) cloudBuffer.clear();

    // Update the noise field
    noiseVelocity.add(noiseAcceleration);
    noiseVector.sub(noiseVelocity);

    // Move noise field slightly in all directions
    noiseAcceleration.x = p5.random(-0.0005, 0.0005);
    noiseAcceleration.y = p5.random(-0.0005, 0.0005);

    // Calculate size of tiles for the smaller buffer
    let tileSize = cloudBuffer ? cloudBuffer.width / tileCount : 0;

    // Draw clouds to buffer - using original rectangle method
    if (cloudBuffer) {
      cloudBuffer.noStroke();

      for (let row = 0; row < tileCount * 2; row++) {
        for (let col = 0; col < tileCount * 2; col++) {
          let x = col * tileSize;
          let y = row * tileSize;

          // Stop if we're outside the buffer
          if (x > cloudBuffer.width || y > cloudBuffer.height) continue;

          // Calculate Perlin noise value based on noiseVector and grid position
          let xnoise = noiseVector.x + col * noiseScale;
          let ynoise = noiseVector.y + row * noiseScale;
          let noiseValue = p5.noise(xnoise, ynoise);

          // Map noise to opacity to create cloud transparency
          let a = p5.map(noiseValue, 0, 0.5, 0, 210);

          // Only draw if there's some visibility
          if (a > 5) {
            cloudBuffer.fill(
              currentCloudColor.levels[0],
              currentCloudColor.levels[1],
              currentCloudColor.levels[2],
              a,
            );
            cloudBuffer.rect(x, y, tileSize, tileSize);
          }
        }
      }

      // Apply blur filter to the buffer
      cloudBuffer.filter(p5.BLUR, 6);

      // Draw the buffer to the main canvas, scaling up
      p5.image(cloudBuffer, 0, 0, p5.width, p5.height);
    }
  };

  p5.windowResized = () => {
    // Skip if disposed
    if (isDisposed) return;

    // Resize main canvas
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

    // Resize buffer to half the new canvas size
    if (cloudBuffer) {
      cloudBuffer.resizeCanvas(
        Math.floor(p5.windowWidth / 2),
        Math.floor(p5.windowHeight / 2),
      );
    }
  };

  function stopAll() {
    // Set disposed flag to prevent further operations
    isDisposed = true;

    // Remove the cloudBuffer
    if (cloudBuffer) {
      cloudBuffer.remove();
      cloudBuffer = null;
    }

    // Remove any DOM elements that might have been created
    if (button) {
      button.remove();
      button = null;
    }

    // Clear vectors and other objects
    noiseVector = null;
    noiseVelocity = null;
    noiseAcceleration = null;
    initialSkyColor = null;
    targetSkyColor = null;
    initialCloudColor = null;
    targetCloudColor = null;

    // Remove the p5 instance
    p5.remove();
  }

  // Add event handler for page unload to clean up
  if (typeof window !== 'undefined') {
    window.addEventListener('unload', stopAll);
  }
};
