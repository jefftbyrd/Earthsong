export const occult = (p5) => {
  // let grotesk = p5.loadFont('/Grotesk-03Regular.otf');
  let grotesk;
  let sourceText = 'ⵙⴻⵅⵙⵉ ⵜⵉⵎⴻⵙ ⵜⵓⵔⴰ ⵐⵄⴿ ⴵꙮⵆ ⵡⵡⵜⵚ ⵣⵣⵣⵣ ⵞⵟⵢⵙ ⵒⵓⵓⵇⴺ';
  let words;
  let isVisible = false;

  // let halfText;

  p5.preload = () => {
    grotesk = p5.loadFont('/Grotesk-03Regular.otf');
  };

  let fade;
  let fadeAmount = 1;

  p5.updateWithProps = (props) => {
    if (props.setVisibility !== undefined) {
      p5.setVisibility(props.setVisibility);
    }
  };

  p5.setup = () => {
    p5.frameRate(12);
    fade = 0;
    let canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.position(0, 0);
    p5.textFont(grotesk);

    // argument to split is "delimiter"
    words = sourceText.split(' ');
    p5.fill(255, 255, 255);
  };

  p5.draw = () => {
    // p5.background(255, 10);
    p5.clear();
    // p5.fill(255, 0, 0, fade);
    p5.drawingContext.filter = 'blur(3px)';
    let word = p5.random(words);

    p5.fill(255, 255, 255, 65 + p5.random(0, 25)); // Very low opacity (15-40)

    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(word.length * 2);
    p5.textSize(100 + p5.random(0, 400));
    p5.text(word, p5.random(p5.width), p5.random(p5.height));
    p5.text(word, p5.random(p5.width), p5.random(p5.height));
    // p5.frameRate(18);
    p5.text(word, p5.random(p5.width), p5.random(p5.height));
    // p5.text(word, p5.random(p5.width), p5.random(p5.height));
    if (fade < 0) fadeAmount = 1;

    if (fade > 255) fadeAmount = -10;

    fade += fadeAmount;
  };

  // Add visibility control methods
  p5.setVisibility = (visible) => {
    isVisible = visible;
    if (visible) {
      p5.loop();
    } else {
      p5.noLoop();
    }
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};
