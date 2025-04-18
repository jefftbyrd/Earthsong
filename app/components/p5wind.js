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
  let isDisposed = false;
  let currentPhase = null;

  p5.setup = () => {
    const canvas = p5.createCanvas(0, 0);
    canvas.position(0, 0);

    // Initialize Tone.js components
    noise1 = new Tone.Noise('pink');
    filter1 = new Tone.Filter(0, 'lowpass').toDestination();
    noise1.connect(filter1);

    noise2 = new Tone.Noise('pink');
    filter2 = new Tone.Filter(0, 'bandpass');
    channel2 = new Tone.Channel().toDestination();

    noise2.connect(filter2);
    filter2.connect(channel2);

    // Configure fade parameters
    noise1.fadeIn = 3;
    noise2.fadeIn = 5;
    noise1.fadeOut = 1; // Faster fadeout for immediate response
    noise2.fadeOut = 1; // Faster fadeout for immediate response
  };

  p5.updateWithProps = (props) => {
    // Store the current phase for reference
    const prevPhase = currentPhase;
    currentPhase = props.phase;

    // Check if phase changed
    const phaseChanged = prevPhase !== currentPhase;

    // Start wind when entering map or returnToMap phase
    if (
      (currentPhase === 'map' || currentPhase === 'returnToMap') &&
      !isDisposed
    ) {
      if (noise1?.state === 'stopped') {
        console.log('Starting wind sounds for map or returnToMap phase');
        // Start both noise sources
        noise1.start();
        noise2.start();
      }
    }
    // Stop wind immediately when leaving map or returnToMap phase
    else if (
      phaseChanged &&
      (prevPhase === 'map' || prevPhase === 'returnToMap') &&
      !isDisposed
    ) {
      console.log('Stopping wind sounds - exited map or returnToMap phase');
      if (noise1?.state === 'started') {
        noise1.stop();
      }
      if (noise2?.state === 'started') {
        noise2.stop();
      }
    }

    // Handle explicit disposal request
    if (props.dispose === true && !isDisposed) {
      stopAll();
    }
  };

  p5.draw = () => {
    // Only process audio modulation when in map or returnToMap phase
    if (
      (currentPhase !== 'map' && currentPhase !== 'returnToMap') ||
      isDisposed
    )
      return;

    // Modulate filter1 frequency (wind base)
    drift1 += p5.random(-5, 5);
    drift1 = p5.constrain(drift1, 170, 300);

    if (filter1) {
      filter1.frequency.value = drift1;
      filter1.Q.value = 7.6;
    }

    if (noise1) {
      noise1.volume.value = -13;
    }

    // Modulate filter2 (wind whistling)
    let drift3 = p5.random(0.5, -0.5);
    let baseFreq2 = 500 + p5.random(-50, 50);

    if (noise2) {
      noise2.volume.value = -4;
    }

    if (filter2) {
      filter2.frequency.value = baseFreq2;
      filter2.Q.value = 12 + drift3;
    }

    // Modulate stereo panning
    drift2 += p5.random(-0.05, 0.05);
    drift2 = p5.constrain(drift2, -0.4, 0.4);

    if (channel2) {
      channel2.pan.value = drift2;
    }
  };

  // Function to clean up all resources
  function stopAll() {
    isDisposed = true;

    // Dispose of all Tone.js objects
    if (noise1) {
      noise1.stop().dispose();
      noise1 = null;
    }

    if (noise2) {
      noise2.stop().dispose();
      noise2 = null;
    }

    if (filter1) {
      filter1.dispose();
      filter1 = null;
    }

    if (filter2) {
      filter2.dispose();
      filter2 = null;
    }

    if (channel2) {
      channel2.dispose();
      channel2 = null;
    }

    // Remove p5 instance
    p5.remove();
  }

  // Add cleanup on unload
  if (typeof window !== 'undefined') {
    window.addEventListener('unload', stopAll);
  }
};
