import * as Tone from 'tone';

export const soundPortal = (p5) => {
  const noto = p5.loadFont('/NotoSansLinearA-Regular.ttf');
  // let bins = 64;

  // let shapeNumber;

  const scl = 10;
  // let strip;
  // let strips = [];

  // let fft;
  // let waveforms = [];
  let waveform;
  // let reversed = false;
  // let visualizer;
  let ellipse;
  // let test;

  // var col = {
  //   r: 0,
  //   g: 0,
  //   b: 0,
  // };
  const shapes = [];
  // let Shape;
  // sampleDraw,
  // playRate;
  let multiPlayer;
  let sounds2;
  // let sounds3;
  // let player;
  // let shapesButton;
  // let analyzer;
  // let number = 0;

  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  p5.updateWithProps = async (props) => {
    if (props.soundsColor) {
      sounds2 = [...props.soundsColor];
    }
    if (props.soundsColor && shapes.length < 1) {
      generateShapes();
    }
    if (props.playerTarget && multiPlayer.player(props.playerTarget).loaded) {
      playSound(props.playerTarget);
    }
    // if (props.resetPortal) {
    //   stopAll();
    // }
    if (props.reset) {
      await stopAll();
    }
  };

  p5.setup = () => {
    const soundCanvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    soundCanvas.style('position', 'absolute');
    soundCanvas.style('z-index', -9999);
    multiPlayer = new Tone.Players();
    p5.textFont(noto);

    // 32 bins
    // fft = new Tone.FFT();
    waveform = new Tone.Waveform();
    multiPlayer.connect(waveform);

    // analyzer = new Tone.FFT(512);
    // multiPlayer.connect(analyzer);
  }; // END SETUP

  function generateShapes() {
    sounds2.map((sound, index) => {
      const x = p5.random(p5.width - 300);
      const y = p5.random(300, p5.height);
      const id = sound.id;
      const name = sound.name;
      const bg = sound.color;
      const url = sound.url;
      const number = index + 1;
      const b = new Shape(x, y, id, name, bg, url, number);
      shapes.push(b);
    });
    generatePlayers();
  }

  function generatePlayers() {
    for (let i = 0; i < shapes.length; i++) {
      // shapes[i].rollover();
      // shapes[i].move();
      shapes[i].players();
      // shapes[i].showName();
    }
  }

  p5.draw = () => {
    p5.background(0);

    // p5.stroke(102, 219, 255);
    let vanishingStroke = p5.color('lightblue');
    vanishingStroke.setAlpha(200);
    p5.stroke(vanishingStroke);

    let frequencyData = waveform.getValue();
    let visualizerFill = p5.color(115, 64, 50);
    visualizerFill.setAlpha(255);
    p5.fill(visualizerFill);
    // p5.noStroke(visualizer);

    if (frequencyData[0] > 0 || frequencyData[0] < 0) {
      let visualizer = p5.beginShape();
      for (let i = 0; i < frequencyData.length; i++) {
        let y = p5.map(frequencyData[i], -1, 1, p5.height / 2, 0);
        p5.vertex(i * scl, y);
      }
      p5.endShape();
    }

    // if (frequencyData[0] === 0) {
    //   p5.line(0, 185, p5.windowWidth, 185);
    // }

    for (let i = 0; i < 48; i++) {
      let step = p5.windowWidth / 48;
      p5.line(
        step * i,
        p5.map(frequencyData[i], -1, 1, p5.height / 6, 0) + p5.height / 5,
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
    if (p5.key === '1') {
      playSound(shapes[0].id);
    }
    if (p5.key === '2') {
      playSound(shapes[1].id);
    }
    if (p5.key === '3') {
      playSound(shapes[2].id);
    }
    if (p5.key === '4') {
      playSound(shapes[3].id);
    }
    if (p5.key === '5') {
      playSound(shapes[4].id);
    }
  };

  function playSound(id) {
    if (multiPlayer.player(id).loaded) {
      if (multiPlayer.player(id).state === 'started') {
        multiPlayer.player(id).stop();
      } else {
        multiPlayer.player(id).start();
      }
    }
  }

  async function stopAll() {
    // console.log('stop triggered');
    // p5.removeElements();
    await multiPlayer.stopAll();

    await multiPlayer.dispose();
    // multiPlayer = new Tone.Players();
    p5.remove();
  }

  class Shape {
    constructor(x, y, id, name, bg, url, number) {
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
    }

    move() {
      this.x = this.x + p5.random(-2, 2);
      this.y = this.y + p5.random(-2, 2);
    }

    show() {
      // p5.noStroke();
      let shapeStroke = p5.color('lightblue');
      shapeStroke.setAlpha(100);
      p5.stroke(shapeStroke);
      if (multiPlayer.player(this.id).loaded) {
        if (multiPlayer.player(this.id).state === 'started') {
          // p5.fill(this.bg);
          let playingFill = p5.color(this.bg);
          // playingFill.setAlpha(p5.map(this.y, 0, p5.windowHeight, 200, 256));
          p5.fill(playingFill);

          p5.select(`.s${this.id}`).attribute(
            'style',
            `background-color:${this.bg};`,
          );
        } else {
          // p5.fill(this.bg.replace('1)', '0.75)'));
          let c = p5.color(this.bg);
          c.setAlpha(90);
          p5.fill(c);
          p5.select(`.s${this.id}`).attribute(
            'style',
            `background-color:${this.bg}; opacity: 0.5;`,
          );
        }
      }
      this.diameter =
        p5.map(this.y, 0, p5.windowHeight, 50, 600) + this.meterMap;
      this.numberSize =
        p5.map(this.y, 0, p5.windowHeight, 10, 200) + this.meterMap / 2;
      // test = p5.select(this.ellipse);
      // this.test.style('align', 'center');
      ellipse = p5.ellipse(this.x, this.y, this.diameter);
      // this.zIndex = p5.map(this.y, 0, p5.windowHeight, 0, 4);

      // this.test.attribute('align', 'center');
      // this.test.style('z-index', -9999);
      // this.ellipse.elt.style.border = '5px dashed deeppink';
      // this.ellipse.attribute('align', 'center');
      // this.ellipse.style('z-index', -9999);
      // this.shapeObject.style(`z-index: ${this.zIndex}`);
      // shapeObject.style('color', 'deeppink');
      // p5.text(sounds2.indexOf(this.id), this.x, this.y);
      // console.log('sounds2 in show', sounds2);
      p5.textSize(this.numberSize);
      p5.noStroke();

      let c = p5.color(0, 0, 0);
      c.setAlpha(150);
      p5.fill(c);
      // p5.strokeWeight(4);
      // p5.stroke(51);
      p5.textAlign(p5.CENTER, p5.CENTER);

      p5.push();
      p5.translate(this.x, this.y);

      if (multiPlayer.player(this.id).state === 'started') {
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

      p5.text(aegean[this.number - 1], 0, 0);

      p5.pop();
    } // END SHOW

    players() {
      multiPlayer.add(this.id, this.url, () => {
        // console.log(`${this.id} loaded`);
      });
      multiPlayer.player(this.id).loop = true;
      multiPlayer.player(this.id).fadeIn = 0.1;
      multiPlayer.player(this.id).fadeOut = 0.3;
      this.meter = new Tone.Meter({ normalRange: true, smoothing: 0.9 });
      this.channel = new Tone.Channel();
      this.reverb = new Tone.Reverb();
      multiPlayer.player(this.id).connect(this.meter);
      multiPlayer.player(this.id).connect(this.channel);
      this.channel.connect(this.reverb);
      this.reverb.toDestination();
    }
    audioControls() {
      this.meterLevel = this.meter.getValue();
      this.meterMap = p5.map(this.meterLevel, 0, 0.3, 0, 200);
      this.revWet = p5.map(this.y, 0, p5.windowHeight, 1, 0);
      this.panX = p5.map(this.x, 0, p5.windowWidth, -1, 1);

      if (this.panX > 1) {
        this.panX = 1;
      }
      if (this.panX < -1) {
        this.panX = -1;
      }
      if (this.revWet > 1) {
        this.revWet = 1;
      }
      if (this.revWet < 0) {
        this.revWet = 0;
      }
      this.channel.pan.value = this.panX;
      this.reverb.wet.value = this.revWet;

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

        p5.keyTyped = () => {
          if (p5.key === 'r' && this.d < this.diameter / 2) {
            // Reverse sound by typing R
            // this.reversed = (value) => !value;
            // if (reversed === true) reversed = false;
            // else reversed = true;
            this.reversed = !this.reversed;

            multiPlayer.player(this.id).reverse = this.reversed;
            // p5.select(`.s${this.id} h3`).attribute(
            //   'style',
            //   `color:rgba(181, 0, 78, 1)`,
            // );
            this.switch = p5.select(`.s${this.id} div`);
            this.switch.toggleClass('reversed');
            // this.switch = p5.select(`.s${this.id} span`);
            // this.switch.toggleClass('reversed');
          }
        };

        if (this.rate > 4) {
          this.rate = 4;
        }
        if (this.rate < 0.05) {
          this.rate = 0.05;
        }
        if (this.volBase > 12) {
          this.volBase = 12;
        }
        if (this.volBase < -12) {
          this.volBase = -12;
        }
        this.volY = p5.map(this.y, 0, p5.windowHeight, -8, 6);
        this.channel.volume.value = this.volY + this.volBase;

        multiPlayer.player(this.id).playbackRate = this.rate;
      }
    }
  } // END SHAPE CLASS

  // Run when the mouse/touch is down.
  p5.mousePressed = () => {
    if (shapes.length > 0) {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        let distance = p5.dist(p5.mouseX, p5.mouseY, shape.x, shape.y);
        let diameter = p5.map(p5.mouseY, 0, p5.windowHeight, 50, 600);

        if (distance < diameter / 2) {
          shape.active = true;
        } else {
          shape.active = false;
        }
      }
    }
    // Prevent default functionality.
    return false;
  };

  p5.mouseDragged = () => {
    if (shapes.length > 0) {
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        if (shape.active) {
          shape.x = p5.mouseX;
          shape.y = p5.mouseY;
          break;
        }
      }
    }
    // Prevent default functionality.
    return false;
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};
