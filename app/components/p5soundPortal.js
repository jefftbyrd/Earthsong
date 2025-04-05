import * as Tone from 'tone';

export const soundPortal = (p5) => {
  const noto = p5.loadFont('/NotoSansLinearA-Regular.ttf');
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

  p5.updateWithProps = async (props) => {
    if (props.soundsColor) {
      sounds2 = [...props.soundsColor];
    }

    // Only generate shapes if we have sounds and no shapes yet
    if (props.soundsColor && shapes.length < 1 && isInitialized) {
      generateShapes();
    }

    // Only attempt to play if multiPlayer exists and the sound is loaded
    if (
      props.playerTarget &&
      isInitialized &&
      multiPlayer &&
      multiPlayer.player(props.playerTarget) &&
      multiPlayer.player(props.playerTarget).loaded
    ) {
      playSound(props.playerTarget);
    }

    if (props.reset) {
      await stopAll();
    }
  };

  p5.setup = () => {
    const soundCanvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    soundCanvas.style('position', 'absolute');
    soundCanvas.style('z-index', -999);
    multiPlayer = new Tone.Players();
    p5.textFont(noto);

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

    sounds2.map((sound, index) => {
      // First, select a random y position
      const y = p5.random(300, p5.height - 100);

      // Calculate initial diameter based on y position
      // This is based on your existing diameter calculation in the show() method
      const initialDiameter = p5.map(
        y,
        0,
        p5.windowHeight,
        p5.windowWidth / 48,
        p5.windowWidth / 4,
      );

      // Calculate padding based on the initial diameter
      const padding = initialDiameter / 2;

      // Generate x position that keeps the shape fully within the canvas
      const x = p5.random(padding, p5.width - padding);

      const id = sound.id;
      const name = sound.name;
      const bg = sound.color;
      const url = sound.url;
      const number = index + 1;

      // Pass the initial diameter to the Shape constructor
      const b = new Shape(x, y, id, name, bg, url, number, initialDiameter);
      shapes.push(b);
    });
    generatePlayers();
  }

  function generatePlayers() {
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].players();
    }
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
        if (multiPlayer.player(shapes[i].id).state === 'started') {
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
        let y = p5.map(frequencyData[i], -1, 1, p5.height / 2, 0);
        p5.vertex(i * scl * (step / 2), y);
      }
      p5.endShape();
    }

    // Draw fewer lines for better performance
    const lineCount = 48; // Original number for visual consistency
    for (let i = 0; i < lineCount; i++) {
      let step = p5.windowWidth / lineCount;
      let dataIndex = Math.min(
        frequencyData.length - 1,
        Math.floor(i * (frequencyData.length / lineCount)),
      );
      p5.line(
        step * i,
        p5.map(frequencyData[dataIndex], -1, 1, p5.height / 6, 0) +
          p5.height / 5,
        step * i * 10 - p5.windowWidth * 4,
        p5.windowWidth,
      );
    }

    for (let i = 0; i < shapes.length; i++) {
      shapes[i].show();
      shapes[i].audioControls();
    }
  }; // END DRAW

  p5.keyPressed = () => {
    if (p5.key === '1' && shapes.length >= 1) {
      playSound(shapes[0].id);
    }
    if (p5.key === '2' && shapes.length >= 2) {
      playSound(shapes[1].id);
    }
    if (p5.key === '3' && shapes.length >= 3) {
      playSound(shapes[2].id);
    }
    if (p5.key === '4' && shapes.length >= 4) {
      playSound(shapes[3].id);
    }
    if (p5.key === '5' && shapes.length >= 5) {
      playSound(shapes[4].id);
    }

    // Handle 'r' key for reversing playback
    if (p5.key === 'r') {
      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        const d = p5.dist(p5.mouseX, p5.mouseY, shape.x, shape.y);
        if (d < shape.diameter / 2) {
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
            console.error('DOM manipulation error:', error);
          }
        }
      }
    }
  };

  function playSound(id) {
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
    if (multiPlayer) {
      await multiPlayer.stopAll();
      await multiPlayer.dispose();
    }

    // Make sure to dispose the shared reverb
    if (sharedReverb) {
      await sharedReverb.dispose();
    }

    // Also dispose the waveform analyzer
    if (waveform) {
      await waveform.dispose();
    }

    // Clear the shapes array to prevent memory leaks
    shapes.length = 0;

    // Reset initialization flag
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
      this.zIndex = 0;
      this.meterMap = 0;
      this.diameter = initialDiameter; // Initialize with calculated diameter
      // Add reverbGain to control wet/dry balance
      this.reverbGain = null;
      this.dryGain = null;
    }

    move() {
      this.x = this.x + p5.random(-2, 2);
      this.y = this.y + p5.random(-2, 2);
    }

    show() {
      const shapeStroke = p5.color('lightblue');
      shapeStroke.setAlpha(100);
      p5.stroke(shapeStroke);

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
              element.setAttribute('style', `background-color:${this.bg};`);
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
                `background-color:${this.bg}; opacity: 0.5;`,
              );
            }
          } catch (error) {
            // Silent error - DOM element might not exist
          }
        }
      }

      // Calculate and store diameter for consistent hit detection
      // Update diameter based on y position and meterMap
      // This keeps the dynamic size behavior in the draw loop
      this.diameter =
        p5.map(
          this.y,
          0,
          p5.windowHeight,
          p5.windowWidth / 48,
          p5.windowWidth / 4,
        ) + this.meterMap;

      this.numberSize =
        p5.map(this.y, 0, p5.windowHeight, 10, 200) + this.meterMap / 2;

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
        p5.text(aegean[this.number - 1], 0, 0);
      }

      p5.pop();
    } // END SHOW

    players() {
      if (!multiPlayer) return;

      multiPlayer.add(this.id, this.url, () => {});

      const player = multiPlayer.player(this.id);
      if (player) {
        player.loop = true;
        player.fadeIn = 0.1;
        player.fadeOut = 0.3;
      }

      this.meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
      this.channel = new Tone.Channel();

      // Create two gain nodes for controlling wet/dry mix
      this.reverbGain = new Tone.Gain(0); // Start with no reverb
      this.dryGain = new Tone.Gain(1); // Start with full dry signal

      // Connect player to meter for visualization
      if (player) {
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
    }

    audioControls() {
      if (!this.meter || !this.channel) return;

      this.meterLevel = this.meter.getValue();
      this.meterMap = p5.map(this.meterLevel, 0, 0.3, 0, 200);

      // Map reverb wetness based on Y position
      this.revWet = p5.map(this.y, 0, p5.windowHeight, 1, 0);
      this.panX = p5.map(this.x, 0, p5.windowWidth, -1, 1);

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
          }
          if (p5.key === 'q') {
            this.volBase -= 0.3;
          }
          if (p5.key === 'w') {
            this.volBase = 0;
          }
        }

        // Apply constraints to rate and volume
        this.rate = p5.constrain(this.rate, 0.05, 4);
        this.volBase = p5.constrain(this.volBase, -12, 12);

        // Calculate final volume
        this.volY = p5.map(this.y, 0, p5.windowHeight, -8, 6);

        if (this.channel && this.channel.volume) {
          this.channel.volume.value = this.volY + this.volBase;
        }

        if (multiPlayer && multiPlayer.player(this.id)) {
          multiPlayer.player(this.id).playbackRate = this.rate;
        }
      }
    }
  } // END SHAPE CLASS

  p5.mousePressed = () => {
    if (shapes.length > 0) {
      let shapeClicked = false;

      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        let distance = p5.dist(p5.mouseX, p5.mouseY, shape.x, shape.y);

        // Use the stored diameter for consistent hit detection
        if (distance < shape.diameter / 2) {
          shape.active = true;
          shapeClicked = true;

          // Actually play/stop the sound when clicked
          // playSound(shape.id);
        } else {
          shape.active = false;
        }
      }

      if (shapeClicked) {
        return false; // Prevent default if we clicked a shape
      }
    }
    return false; // Maintain original behavior
  };

  // Make touchStarted behavior match mousePressed
  p5.touchStarted = () => {
    if (shapes.length > 0) {
      let shapeClicked = false;

      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        let distance = p5.dist(p5.mouseX, p5.mouseY, shape.x, shape.y);

        if (distance < shape.diameter / 2) {
          shape.active = true;
          shapeClicked = true;

          // Actually play/stop the sound when touched
          // playSound(shape.id);
        } else {
          shape.active = false;
        }
      }

      if (shapeClicked) {
        return false;
      }
    }
    return false;
  };

  p5.mouseDragged = () => {
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

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};
