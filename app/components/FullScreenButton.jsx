export default function FullscreenButton() {
  const handleFullscreen = () => {
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  return <button onClick={handleFullscreen}>Enter Fullscreen</button>;
}
