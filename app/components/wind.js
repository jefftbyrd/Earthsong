'use client';
import * as Tone from 'tone';

export const wind = (p5) => {
  let noise1;
  let filter1;
  let filter2;
  let drift1 = 250;
  let drift2 = 400;
  let noise2;
  let channel2;

  p5.setup = () => {
    const canvas = p5.createCanvas(0, 0);
    canvas.position(0, 0);
    noise1 = new Tone.Noise('pink');
    filter1 = new Tone.Filter(0, 'lowpass').toDestination();
    noise1.connect(filter1);
    noise2 = new Tone.Noise('pink');
    noise1.fadeIn = 3;
    noise2.fadeIn = 5;
    noise1.fadeOut = 3;
    noise2.fadeOut = 3;

    filter2 = new Tone.Filter(0, 'bandpass');
    channel2 = new Tone.Channel().toDestination();
    noise2.connect(filter2);
    filter2.connect(channel2);
  };

  p5.updateWithProps = (props) => {
    if (
      props.phase === 'map' &&
      noise1 &&
      noise2 &&
      noise1.state === 'stopped'
    ) {
      noise1.start();
      noise2.start();
    }
    if (
      props.phase !== 'map' &&
      noise1 &&
      noise2 &&
      noise1.state === 'started'
    ) {
      noise1.stop();
      noise2.stop();
    }
  };

  p5.draw = () => {
    drift1 += p5.random(-5, 5);
    if (drift1 < 170) {
      drift1 = 170;
    }
    if (drift1 > 300) {
      drift1 = 300;
    }
    filter1.frequency.value = drift1;
    filter1.Q.value = 7.6;
    noise1.volume.value = -13;
    let drift3 = p5.random(0.5, -0.5);
    noise2.volume.value = -4;
    let baseFreq2 = 500;
    baseFreq2 += p5.random(-50, 50);

    filter2.frequency.value = baseFreq2;
    drift2 += p5.random(-0.05, 0.05);
    if (drift2 > 0.4) {
      drift2 = 0.4;
    }
    if (drift2 < -0.4) {
      drift2 = -0.4;
    }
    filter2.Q.value = 12 + drift3;
    channel2.pan.value = drift2;
  };
};
