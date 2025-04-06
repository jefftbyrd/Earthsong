export default function FullscreenMobileView() {
  const maximizeScreen = () => {
    // For iOS Safari
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    // This works for many mobile browsers to hide the address bar
    window.scrollTo(0, 1);

    // For some mobile browsers, you need to delay the scroll
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 100);
  };

  // Run on button click
  return <button onClick={maximizeScreen}>Maximize Screen</button>;
}
