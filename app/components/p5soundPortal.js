import * as Tone from 'tone';

export const soundPortal = (p5) => {
  // const noto = p5.loadFont('/NotoSansLinearA-Regular.ttf');
  const scl = 10;
  let waveform;
  let ellipse;
  const shapes = [];
  let multiPlayer;
  let sounds2;
  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];
  // Create shared reverb instance
  let sharedReverb;
  // Performance optimization variables
  const analyzerSize = 512; // Smaller than default but not too small
  let lastWaveformData = [];
  let isInitialized = false;
  let canvasHeight = window.innerHeight;
  let isPanelOpen = false;

  // Variables to track touch behavior
  let touchStartTime = 0;
  let touchStartPos = { x: 0, y: 0 };
  const DRAG_THRESHOLD = 10; // pixels - movement more than this is a drag
  const TAP_THRESHOLD = 200; // milliseconds - press shorter than this is a tap

  p5.updateWithProps = async (props) => {
    // If reset is triggered, ensure proper cleanup
    if (props.reset) {
      console.log('Reset triggered in p5soundPortal, stopping all sounds');
      await stopAll(); // Make sure this is awaited

      // After stopAll completes, check if we need to regenerate
      if (props.soundsColor && props.soundsColor.length > 0) {
        sounds2 = props.soundsColor;
        if (isInitialized) {
          generateShapes();
        }
      }
      return; // Exit early to avoid other processing during reset
    }

    // console.log('soundsColor arrives in p5.updateWithProps', props.soundsColor);
    // Your existing props handling code
    if (props.soundsColor) {
      // sounds2 = [...props.soundsColor];
      sounds2 = props.soundsColor;
    }
    console.log('props.panelOpen', props.panelOpen);
    isPanelOpen = props.panelOpen;
    console.log('isPanelOpen', isPanelOpen);

    // Handle containerHeight more forcefully
    if (props.containerHeight && props.containerHeight > 0) {
      canvasHeight = props.containerHeight;
      // console.log('P5 received container height:', canvasHeight);

      // If canvas already exists, resize it
      if (p5.canvas) {
        // console.log('Resizing canvas to height:', canvasHeight);
        p5.resizeCanvas(p5.width, canvasHeight);
      }
    }

    // Only generate shapes if we have sounds and no shapes yet
    if (sounds2 && shapes.length < 1 && isInitialized) {
      generateShapes();
    }

    // Only attempt to play if multiPlayer exists and the sound is loaded
    if (
      props.activateTarget &&
      props.playerTarget &&
      isInitialized &&
      multiPlayer.player(props.playerTarget) &&
      multiPlayer.player(props.playerTarget).loaded
    ) {
      playSound(props.playerTarget);
    } else if (props.playerTarget && isInitialized && multiPlayer) {
      // Find the shape with this ID and queue the play command
      const targetShape = shapes.find(
        (shape) => shape.id === props.playerTarget,
      );
      if (targetShape) {
        targetShape.playWhenLoaded = true;
      }
    }

    if (props.reset) {
      // console.log('Reset triggered in p5soundPortal, stopping all sounds');
      await stopAll(); // Make sure this is awaited
    }
  };

  p5.setup = () => {
    // console.log('Creating canvas with height:', canvasHeight);
    const soundCanvas = p5.createCanvas(p5.windowWidth, canvasHeight);
    soundCanvas.style('position', 'absolute');
    soundCanvas.style('z-index', -999);
    multiPlayer = new Tone.Players();
    // p5.textFont(noto);
    p5.textFont('Noto Sans Linear A');
    // p5.textFont('Basteleur');

    // Create the shared reverb instance
    sharedReverb = new Tone.Reverb();
    sharedReverb.toDestination();

    // Create waveform with smaller size to improve performance
    waveform = new Tone.Waveform(analyzerSize);
    multiPlayer.connect(waveform);

    // Initialize last waveform data
    lastWaveformData = new Array(analyzerSize).fill(0);

    // Generate shapes if we already have sounds
    if (sounds2 && sounds2.length > 0) {
      generateShapes();
    }

    isInitialized = true;
  }; // END SETUP

  function generateShapes() {
    // Clear existing shapes to prevent duplicates on reset
    shapes.length = 0;

    // Try to place shapes with no overlaps
    sounds2.forEach((sound, index) => {
      const id = sound.id;
      const name = sound.name;
      const bg = sound.color;
      const url = sound.url;
      const number = index + 1;

      // Calculate a suitable diameter based on canvas size and number of shapes
      const baseDiameter = p5.min(
        p5.height / 4,
        p5.width / (sounds2.length + 1),
      );
      let initialDiameter = p5.random(baseDiameter * 0.7, baseDiameter * 1.2);

      // Try to find a non-overlapping position
      let x, y;
      let attempts = 0;
      const maxAttempts = 50;
      let validPosition = false;

      while (!validPosition && attempts < maxAttempts) {
        // Generate random position
        // Keep padding from edges based on diameter
        const padding = initialDiameter / 2;
        x = p5.random(padding, p5.width - padding);
        y = p5.random(300, p5.height - 100);

        // Check if this position overlaps with any existing shape
        validPosition = true;
        for (let i = 0; i < shapes.length; i++) {
          const existingShape = shapes[i];
          const distance = p5.dist(x, y, existingShape.x, existingShape.y);
          const minDistance = (initialDiameter + existingShape.diameter) / 2;

          if (distance < minDistance) {
            validPosition = false;
            break;
          }
        }

        attempts++;
      }

      // If we couldn't find a non-overlapping position after max attempts,
      // adjust the diameter to be smaller and try one more time with relaxed constraints.
      if (!validPosition) {
        initialDiameter *= 0.8;
        x = p5.random(initialDiameter / 2, p5.width - initialDiameter / 2);
        y = p5.random(300, p5.height - 100);
      }

      // Create and add the shape
      const b = new Shape(x, y, id, name, bg, url, number, initialDiameter);
      shapes.push(b);
    });

    // Start loading process for each shape
    shapes.forEach((shape) => shape.initLoad());
  }

  p5.draw = () => {
    p5.background(0);

    const vanishingStroke = p5.color('lightblue');
    vanishingStroke.setAlpha(200);
    p5.stroke(vanishingStroke);

    // Get frequency data
    let frequencyData = waveform.getValue();

    // If nothing is playing, we'll gradually fade out the previous visualization
    let isAnyPlaying = false;
    if (shapes.length > 0) {
      for (let i = 0; i < shapes.length; i++) {
        if (
          shapes[i].isLoaded &&
          multiPlayer.player(shapes[i].id).state === 'started'
        ) {
          isAnyPlaying = true;
          break;
        }
      }
    }

    if (!isAnyPlaying) {
      // Use the last frequency data but fade it out
      for (let i = 0; i < lastWaveformData.length; i++) {
        lastWaveformData[i] *= 0.9; // Gradually reduce to zero
      }
      frequencyData = lastWaveformData;
    } else {
      // Save this data for later use
      lastWaveformData = [...frequencyData];
    }

    const visualizerFill = p5.color(115, 64, 50);
    visualizerFill.setAlpha(255);
    p5.fill(visualizerFill);

    if (
      frequencyData &&
      (Math.abs(frequencyData[0]) > 0 || Math.abs(frequencyData[1]) > 0)
    ) {
      p5.beginShape();
      // Draw fewer points for better performance
      const step = Math.max(1, Math.floor(frequencyData.length / 100));
      for (let i = 0; i < frequencyData.length; i += step) {
        let y = p5.map(frequencyData[i], -1, 1, p5.height / 5, 0);
        p5.vertex(i * scl * (step / 2), y);
      }
      p5.endShape();
    }

    // Draw fewer lines for better performance
    const lineCount = 48; // Original number for visual consistency
    for (let i = 0; i < lineCount; i++) {
      let step = p5.width / lineCount;
      let dataIndex = Math.min(
        frequencyData.length - 1,
        Math.floor(i * (frequencyData.length / lineCount)),
      );
      p5.line(
        step * i,
        p5.map(frequencyData[dataIndex], -1, 1, p5.height / 6, 0) +
          p5.height / 10,
        step * i * 10 - p5.width * 4,
        p5.height, // Extend lines to the bottom of the canvas
      );
    }

    // Sort shapes by y-coordinate to determine drawing order
    // Shapes with lower y (higher on screen) will be drawn first
    // Shapes with higher y (lower on screen) will be drawn last (on top)
    shapes.sort((a, b) => a.y - b.y);

    // Update each shape's zIndex based on its position
    // This will allow us to reflect the z-ordering in the DOM if needed
    shapes.forEach((shape, index) => {
      shape.zIndex = index;
    });

    // Draw all shapes in the sorted order
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].show();
      shapes[i].audioControls();
      // Check if any pending load operations have completed
      shapes[i].checkLoadStatus();
    }
  }; // END DRAW

  p5.keyPressed = () => {
    if (isPanelOpen) return; // Just return, don't return false
    // Map keys 1-5 to the shapes by their original index/number
    // instead of their position in the array
    if (p5.key >= '1' && p5.key <= '5') {
      const keyNumber = parseInt(p5.key);
      // Find the shape with the matching number property
      const targetShape = shapes.find((shape) => shape.number === keyNumber);
      if (targetShape) {
        playSound(targetShape.id);
      }
    }

    // Handle 'r' key for reversing playback (keep as is)
    if (p5.key === 'r') {
      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        const d = p5.dist(p5.mouseX, p5.mouseY, shape.x, shape.y);
        if (d < shape.diameter / 2 && shape.isLoaded) {
          shape.reversed = !shape.reversed;
          multiPlayer.player(shape.id).reverse = shape.reversed;

          // Safely toggle the reversed class
          try {
            const element = document.querySelector(`.s${shape.id} div`);
            if (element) {
              if (shape.reversed) {
                element.classList.add('reversed');
              } else {
                element.classList.remove('reversed');
              }
            }
          } catch (error) {
            // console.error('DOM manipulation error:', error);
          }
        }
      }
    }
  };

  function playSound(id) {
    const shape = shapes.find((s) => s.id === id);
    if (!shape || !shape.isLoaded) return;

    if (
      multiPlayer &&
      multiPlayer.player(id) &&
      multiPlayer.player(id).loaded
    ) {
      if (multiPlayer.player(id).state === 'started') {
        multiPlayer.player(id).stop();
      } else {
        multiPlayer.player(id).start();
      }
    }
  }

  async function stopAll() {
    console.log('p5 STOP ALL');

    // Cancel all scheduled events first
    const transport = Tone.getTransport();
    transport.cancel();
    transport.stop();

    // Ensure all audio processing is stopped before cleanup
    if (multiPlayer) {
      await multiPlayer.stopAll();
    }

    // Dispose of all Shape's audio resources
    for (let shape of shapes) {
      if (shape.meter) await shape.meter.dispose();
      if (shape.channel) await shape.channel.dispose();
      if (shape.reverbGain) await shape.reverbGain.dispose();
      if (shape.dryGain) await shape.dryGain.dispose();

      // Remove any DOM event listeners that might have been added
      const element = document.querySelector(`.s${shape.id}`);
      if (element) {
        // Clone and replace to remove all listeners
        const newElement = element.cloneNode(true);
        if (element.parentNode) {
          element.parentNode.replaceChild(newElement, element);
        }
      }
    }

    // Then dispose master objects
    if (multiPlayer) await multiPlayer.dispose();
    if (sharedReverb) await sharedReverb.dispose();
    if (waveform) await waveform.dispose();

    // Clear arrays
    shapes.length = 0;
    lastWaveformData.length = 0;

    // Reset flags
    isInitialized = false;

    p5.remove();
  }

  // Modify the Shape constructor to accept initialDiameter
  class Shape {
    constructor(x, y, id, name, bg, url, number, initialDiameter) {
      this.x = x;
      this.y = y;
      this.isClicked = false;
      this.id = id;
      this.name = name;
      this.bg = bg;
      this.url = url;
      this.rate = 1;
      this.volBase = 0;
      this.reversed = false;
      this.number = number;
      this.reverseToggle = false;
      this.zIndex = 0; // Default z-index, will be updated based on y-position
      this.meterMap = 0;
      this.diameter = initialDiameter; // Initialize with calculated diameter
      // Add reverbGain to control wet/dry balance
      this.reverbGain = null;
      this.dryGain = null;
      this.volumeVisualOffset = 0; // This will be added to the diameter

      // New properties for loading state
      this.isLoading = false;
      this.isLoaded = false;
      this.loadProgress = 0;
      this.loadStartTime = 0;
      this.playWhenLoaded = false;
      this.loadingAnimation = 0;
    }

    move() {
      this.x = this.x + p5.random(-2, 2);
      this.y = this.y + p5.random(-2, 2);
    }

    show() {
      const shapeStroke = p5.color('lightblue');
      shapeStroke.setAlpha(100);
      p5.stroke(shapeStroke);

      // Show different appearance based on loading state
      if (!this.isLoaded) {
        // Loading state visualization
        let loadingColor = p5.color(this.bg);
        loadingColor.setAlpha(50);
        p5.fill(loadingColor);

        // Draw the base circle
        ellipse = p5.ellipse(this.x, this.y, this.diameter);

        // Draw loading indicator
        this.loadingAnimation = (this.loadingAnimation + 0.05) % (Math.PI * 2);

        p5.push();
        p5.translate(this.x, this.y);

        // Draw loading arc
        p5.noFill();
        p5.stroke(255, 255, 255, 200);
        p5.strokeWeight(3);
        p5.arc(
          0,
          0,
          this.diameter * 0.8,
          this.diameter * 0.8,
          this.loadingAnimation,
          this.loadingAnimation + Math.PI,
        );

        // Draw loading text
        p5.noStroke();
        p5.fill(255);
        p5.textSize(this.diameter * 0.15);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textFont('Basteleur');
        p5.textStyle('400'); // For the Moonlight weight
        p5.text('Loading...', 0, 0);

        p5.pop();

        // Update DOM element if exists
        try {
          const element = document.querySelector(`.s${this.id}`);
          if (element) {
            element.setAttribute(
              'style',
              `background-color:${this.bg}; opacity: 0.3; z-index: ${this.zIndex};`,
            );

            // Add loading text to the DOM element
            // HIDE THIS LOADING MESSAGE, SINCE THE SOUND CIRCLES ALREADY SAY 'LOADING'
            // const loadingTextEl = element.querySelector('.loading-text');
            // if (!loadingTextEl) {
            //   const loadingText = document.createElement('div');
            //   loadingText.className = 'loading-text';
            //   loadingText.style.position = 'absolute';
            //   loadingText.style.top = '50%';
            //   loadingText.style.left = '50%';
            //   loadingText.style.transform = 'translate(-50%, -50%)';
            //   loadingText.style.color = 'white';
            //   loadingText.textContent = 'Loading...';
            //   element.appendChild(loadingText);
            // }
          }
        } catch (error) {
          // Silent error - DOM element might not exist
        }

        return; // Skip the rest of the method while loading
      }

      // Sound loaded - regular display logic
      if (
        multiPlayer &&
        multiPlayer.player(this.id) &&
        multiPlayer.player(this.id).loaded
      ) {
        if (multiPlayer.player(this.id).state === 'started') {
          const playingFill = p5.color(this.bg);
          p5.fill(playingFill);

          try {
            const element = document.querySelector(`.s${this.id}`);
            if (element) {
              element.setAttribute(
                'style',
                `background-color:${this.bg}; z-index: ${this.zIndex};`,
              );

              // Remove loading text if present
              const loadingText = element.querySelector('.loading-text');
              if (loadingText) {
                element.removeChild(loadingText);
              }
            }
          } catch (error) {
            // Silent error - DOM element might not exist
          }
        } else {
          let c = p5.color(this.bg);
          c.setAlpha(90);
          p5.fill(c);

          try {
            const element = document.querySelector(`.s${this.id}`);
            if (element) {
              element.setAttribute(
                'style',
                `background-color:${this.bg}; opacity: 0.5; z-index: ${this.zIndex};`,
              );

              // Remove loading text if present
              const loadingText = element.querySelector('.loading-text');
              if (loadingText) {
                element.removeChild(loadingText);
              }
            }
          } catch (error) {
            // Silent error - DOM element might not exist
          }
        }
      }

      // Calculate and store diameter for consistent hit detection
      // Update diameter based on y position and meterMap
      // This keeps the dynamic size behavior in the draw loop
      // When calculating the final diameter, include the volumeVisualOffset
      this.diameter =
        p5.map(this.y, 0, p5.height, p5.height / 48, p5.height / 3) +
        this.meterMap / 2 +
        this.volumeVisualOffset; // Add the volume visual offset

      // this.numberSize =
      //   p5.map(this.y, 0, p5.height, 10, 200) + this.meterMap / 2;
      this.numberSize =
        p5.map(
          this.y,
          0,
          p5.height,
          p5.windowHeight / 100,
          p5.windowHeight / 6,
        ) +
        this.meterMap / 2 +
        this.volumeVisualOffset / 2;

      ellipse = p5.ellipse(this.x, this.y, this.diameter);
      p5.textSize(this.numberSize);
      p5.noStroke();
      let c = p5.color(0, 0, 0);
      c.setAlpha(150);
      p5.fill(c);

      p5.textAlign(p5.CENTER, p5.CENTER);

      p5.push();
      p5.translate(this.x, this.y);

      if (
        multiPlayer &&
        multiPlayer.player(this.id) &&
        multiPlayer.player(this.id).state === 'started'
      ) {
        if (!this.reversed) {
          p5.rotate(
            p5.radians(
              p5.frameCount *
                p5.map(
                  multiPlayer.player(this.id).playbackRate,
                  0.1,
                  4,
                  0.5,
                  10,
                ),
            ),
          );
        } else {
          p5.rotate(
            p5.radians(
              -(
                p5.frameCount *
                p5.map(
                  multiPlayer.player(this.id).playbackRate,
                  0.1,
                  4,
                  0.5,
                  10,
                )
              ),
            ),
          );
        }
      }

      // Make sure the index is valid before accessing aegean
      if (this.number > 0 && this.number <= aegean.length) {
        // Center-align the text
        p5.textAlign(p5.CENTER, p5.CENTER);

        // Calculate yOffset to perfectly center the text vertically
        let yOffset = this.numberSize * 0.23; // Adjust based on font metrics
        if (this.number === 4 || this.number === 5) {
          yOffset = this.numberSize * 0.05; // Adjust this value (-2 pixels up) as needed
        }
        // Render the text at the center of the circle
        p5.text(aegean[this.number - 1], 0, yOffset);
      }

      p5.pop();
    } // END SHOW

    // Initialize loading process for this shape
    initLoad() {
      if (this.isLoaded || this.isLoading) return;

      this.isLoading = true;
      this.loadStartTime = Date.now();
      this.loadProgress = 0;

      // Create a temporary audio element with reference to clean up later
      const tempAudio = new Audio();
      this.tempAudio = tempAudio; // Store reference for cleanup
      tempAudio.src = this.url;

      // Add named functions that can be removed later if needed
      const onLoadedData = () => {
        this.loadProgress = 0.5;
      };
      const onCanPlayThrough = () => {
        this.loadProgress = 0.9;
      };
      const onError = () => {
        this.loadProgress = 0;
        this.isLoading = false;
      };

      // Store these functions for potential cleanup
      this.audioListeners = {
        loadeddata: onLoadedData,
        canplaythrough: onCanPlayThrough,
        error: onError,
      };

      // Add event listeners
      tempAudio.addEventListener('loadeddata', onLoadedData);
      tempAudio.addEventListener('canplaythrough', onCanPlayThrough);
      tempAudio.addEventListener('error', onError);

      // Add cleanup when Tone.js finishes loading
      multiPlayer.add(this.id, this.url, () => {
        // Clean up temp audio element
        if (this.tempAudio) {
          Object.entries(this.audioListeners).forEach(([event, listener]) => {
            this.tempAudio.removeEventListener(event, listener);
          });
          this.tempAudio = null;
          this.audioListeners = null;
        }

        this.isLoaded = true;
        this.isLoading = false;
        this.loadProgress = 1;
        this.setupAudioProcessing();

        if (this.playWhenLoaded) {
          playSound(this.id);
          this.playWhenLoaded = false;
        }
      });
    }

    // Check if loading is complete and set up additional components
    checkLoadStatus() {
      if (!this.isLoaded && this.isLoading) {
        // If loading is taking too long, increment progress naturally
        const elapsedTime = Date.now() - this.loadStartTime;
        if (elapsedTime > 2000 && this.loadProgress < 0.5) {
          this.loadProgress = Math.min(0.5, this.loadProgress + 0.01);
        }

        // Check if player is loaded in Tone.js
        if (
          multiPlayer &&
          multiPlayer.player(this.id) &&
          multiPlayer.player(this.id).loaded
        ) {
          this.isLoaded = true;
          this.isLoading = false;
          this.loadProgress = 1;

          // Set up additional audio processing if not done yet
          if (!this.meter) {
            this.setupAudioProcessing();
          }

          // Autoplay if requested while loading
          if (this.playWhenLoaded) {
            playSound(this.id);
            this.playWhenLoaded = false;
          }
        }
      }
    }

    // Set up audio processing components
    setupAudioProcessing() {
      const player = multiPlayer.player(this.id);
      if (!player) return;

      player.loop = true;
      player.fadeIn = 0.1;
      player.fadeOut = 0.3;

      this.meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
      this.channel = new Tone.Channel();

      // Create two gain nodes for controlling wet/dry mix
      this.reverbGain = new Tone.Gain(0); // Start with no reverb
      this.dryGain = new Tone.Gain(1); // Start with full dry signal

      // Connect player to meter for visualization
      player.connect(this.meter);

      // Connect player to channel for volume/pan control
      player.connect(this.channel);

      // Connect channel to both dry and wet paths
      this.channel.connect(this.dryGain);
      this.channel.connect(this.reverbGain);

      // Connect wet path to shared reverb
      if (sharedReverb) {
        this.reverbGain.connect(sharedReverb);
      }

      // Connect dry path directly to destination
      this.dryGain.toDestination();
    }

    audioControls() {
      if (!this.isLoaded) return;
      if (!this.meter || !this.channel) return;

      this.meterLevel = this.meter.getValue();
      this.meterMap = p5.map(this.meterLevel, 0, 0.3, 0, p5.width / 5);

      // Map reverb wetness based on Y position
      this.revWet = p5.map(this.y, 0, p5.height, 1, 0);
      this.panX = p5.map(this.x, 0, p5.width, -1, 1);

      // Constrain values to valid ranges
      this.panX = p5.constrain(this.panX, -1, 1);
      this.revWet = p5.constrain(this.revWet, 0, 1);

      // Apply pan
      if (this.channel && this.channel.pan) {
        this.channel.pan.value = this.panX;
      }

      // Apply reverb wet/dry balance
      if (this.reverbGain && this.dryGain) {
        this.reverbGain.gain.value = this.revWet;
        this.dryGain.gain.value = 1 - this.revWet;
      }

      this.d = p5.dist(p5.mouseX, p5.mouseY, this.x, this.y);
      if (this.d < this.diameter / 2) {
        if (p5.keyIsPressed === true) {
          if (p5.key === 'd') {
            this.rate += 0.02;
          }
          if (p5.key === 'a') {
            this.rate -= 0.02;
          }
          if (p5.key === 's') {
            this.rate = 1;
          }
          if (p5.key === 'e') {
            this.volBase += 0.3;
            // Add visual volume effect - increase diameter
            this.volumeVisualOffset += 5;
          }
          if (p5.key === 'q') {
            this.volBase -= 0.3;
            // Add visual volume effect - decrease diameter
            this.volumeVisualOffset -= 5;
          }
          if (p5.key === 'w') {
            this.volBase = 0;
            // Reset visual volume effect
            this.volumeVisualOffset = 0;
          }
        }

        // Apply constraints to volume visual offset to prevent extreme sizes
        this.volumeVisualOffset = p5.constrain(
          this.volumeVisualOffset,
          -50,
          100,
        );

        // Apply constraints to rate and volume (existing code)
        this.rate = p5.constrain(this.rate, 0.05, 4);
        this.volBase = p5.constrain(this.volBase, -12, 12);

        // Calculate final volume
        this.volY = p5.map(this.y, 0, p5.height, -8, 6);

        if (this.channel && this.channel.volume) {
          this.channel.volume.value = this.volY + this.volBase;
        }

        if (multiPlayer && multiPlayer.player(this.id)) {
          multiPlayer.player(this.id).playbackRate = this.rate;
        }
      }
    }
    dispose() {
      // Clean up temp audio element if it exists
      if (this.tempAudio) {
        if (this.audioListeners) {
          Object.entries(this.audioListeners).forEach(([event, listener]) => {
            this.tempAudio.removeEventListener(event, listener);
          });
        }
        this.tempAudio = null;
        this.audioListeners = null;
      }

      // Dispose audio processing nodes
      if (this.meter) this.meter.dispose();
      if (this.channel) this.channel.dispose();
      if (this.reverbGain) this.reverbGain.dispose();
      if (this.dryGain) this.dryGain.dispose();

      // Clear references
      this.meter = null;
      this.channel = null;
      this.reverbGain = null;
      this.dryGain = null;
    }
  }

  // Find which shape is under the cursor/touch point
  function getShapeAtPosition(x, y) {
    // Create a copy of shapes sorted by z-index (higher values first)
    // to ensure we select the topmost shape when they overlap
    const sortedShapes = [...shapes].sort((a, b) => b.zIndex - a.zIndex);

    for (let i = 0; i < sortedShapes.length; i++) {
      let shape = sortedShapes[i];
      let distance = p5.dist(x, y, shape.x, shape.y);

      if (distance < shape.diameter / 2) {
        return shape;
      }
    }
    return null;
  }

  // Refactored touch/mouse handling
  p5.mousePressed = () => {
    if (isPanelOpen) return; // Just return, don't return false
    // Record the start time and position for distinguishing between tap and drag
    touchStartTime = p5.millis();
    touchStartPos = { x: p5.mouseX, y: p5.mouseY };

    // Find the shape under the cursor
    const shape = getShapeAtPosition(p5.mouseX, p5.mouseY);

    // If we found a shape, mark it as potentially active for dragging
    if (shape) {
      shape.active = true;

      // When a shape is clicked, bring it to the front by moving it to the end
      // of the shapes array before the next draw cycle sorts by y-position
      const shapeIndex = shapes.findIndex((s) => s.id === shape.id);
      if (shapeIndex !== -1) {
        // Update the shape's zIndex to the highest value
        shape.zIndex = shapes.length;
      }

      return false; // Prevent default browser behavior
    }

    return false; // Maintain original behavior
  };

  p5.mouseReleased = () => {
    if (isPanelOpen) return; // Just return, don't return false
    // Calculate touch duration and distance moved
    const touchDuration = p5.millis() - touchStartTime;
    const distMoved = p5.dist(
      touchStartPos.x,
      touchStartPos.y,
      p5.mouseX,
      p5.mouseY,
    );

    // If this was a short touch without much movement, treat it as a tap to toggle sound
    if (touchDuration < TAP_THRESHOLD && distMoved < DRAG_THRESHOLD) {
      const shape = getShapeAtPosition(p5.mouseX, p5.mouseY);
      if (shape) {
        // Toggle sound on/off for this shape if loaded
        if (shape.isLoaded) {
          playSound(shape.id);
        } else if (shape.isLoading) {
          // Queue play when loaded
          shape.playWhenLoaded = true;
        }
      }
    }

    // Reset active state for all shapes
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].active = false;
    }

    return false; // Prevent default browser behavior
  };

  // For mobile touch events
  p5.touchStarted = (event) => {
    if (isPanelOpen) return; // Just return, don't return false
    // Use the same logic as mousePressed
    touchStartTime = p5.millis();
    touchStartPos = { x: p5.mouseX, y: p5.mouseY };

    const shape = getShapeAtPosition(p5.mouseX, p5.mouseY);
    if (shape) {
      shape.active = true;
      return false;
    }

    // Commenting this out allows click on other items, besides canvas
    // return false;
  };

  p5.touchEnded = (event) => {
    if (isPanelOpen) return; // Just return, don't return false
    // Use the same logic as mouseReleased
    const touchDuration = p5.millis() - touchStartTime;
    const distMoved = p5.dist(
      touchStartPos.x,
      touchStartPos.y,
      p5.mouseX,
      p5.mouseY,
    );

    if (touchDuration < TAP_THRESHOLD && distMoved < DRAG_THRESHOLD) {
      const shape = getShapeAtPosition(p5.mouseX, p5.mouseY);
      if (shape) {
        if (shape.isLoaded) {
          playSound(shape.id);
        } else if (shape.isLoading) {
          // Queue play when loaded
          shape.playWhenLoaded = true;
        }
      }
    }

    for (let i = 0; i < shapes.length; i++) {
      shapes[i].active = false;
    }

    // Commenting this out allows click on other items, besides canvas
    // return false;
  };

  p5.mouseDragged = () => {
    if (isPanelOpen) return; // Just return, don't return false
    // Only process if we've moved enough to consider it a drag
    const distMoved = p5.dist(
      touchStartPos.x,
      touchStartPos.y,
      p5.mouseX,
      p5.mouseY,
    );

    if (distMoved < DRAG_THRESHOLD) {
      return false; // Not enough movement to be considered a drag yet
    }

    // Handle shape dragging
    if (shapes.length > 0) {
      let shapeMoved = false;

      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        if (shape.active) {
          // Calculate new position
          let newX = p5.mouseX;
          let newY = p5.mouseY;

          // Constrain position to keep the shape fully within canvas
          // Consider the radius (diameter/2) when setting boundaries
          newX = p5.constrain(
            newX,
            shape.diameter / 2,
            p5.width - shape.diameter / 2,
          );
          newY = p5.constrain(
            newY,
            shape.diameter / 2,
            p5.height - shape.diameter / 2,
          );

          // Update the shape's position
          shape.x = newX;
          shape.y = newY;

          // When dragging a shape to a new y-position, we'll update its zIndex
          // in the next draw cycle automatically via the sorting mechanism

          shapeMoved = true;
          break; // Only move the first active shape (original behavior)
        }
      }

      if (shapeMoved) {
        return false;
      }
    }
    return false;
  };

  // Make touchMoved behavior match mouseDragged
  p5.touchMoved = () => {
    if (isPanelOpen) return; // Just return, don't return false
    return p5.mouseDragged();
  };

  p5.windowResized = () => {
    // console.log('Window resized, using height:', canvasHeight);
    p5.resizeCanvas(p5.windowWidth, canvasHeight);
  };
};
