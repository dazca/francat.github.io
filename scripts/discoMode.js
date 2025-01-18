// overlayToggle.js

let overlay, clickTimer, lastShakeTime, colorChangeInterval, isOverlayActive;

// Initialize the script
export function initOverlayToggle(overlayElementId) {
  overlay = document.getElementById(overlayElementId);
  lastShakeTime = 0;
  isOverlayActive = false;

  // Detect phone shake (using DeviceMotionEvent)
  window.addEventListener('devicemotion', handleShake);

  // Detect mousedown for 2 seconds
  document.body.addEventListener('mousedown', handleMouseDown);
  document.body.addEventListener('mouseup', handleMouseUp);
}

function handleShake(event) {
  const currentTime = Date.now();
  const shakeThreshold = 15; // Adjust for sensitivity
  const timeBetweenShakes = 1000; // Minimum time between shakes (1 second)

  const acceleration = event.accelerationIncludingGravity;
  const shakeMagnitude = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);

  if (shakeMagnitude > shakeThreshold && currentTime - lastShakeTime > timeBetweenShakes) {
    lastShakeTime = currentTime;
    toggleOverlay();
  }
}

function handleMouseDown() {
  if (clickTimer) clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    toggleOverlay();
  }, 2000); // 2 seconds delay
}

function handleMouseUp() {
  if (clickTimer) clearTimeout(clickTimer);
}

function toggleOverlay() {
  if (overlay.style.visibility === 'hidden' || !overlay.style.visibility) {
    overlay.style.visibility = 'visible';
    startColorChange();
  } else {
    overlay.style.visibility = 'hidden';
    // Keep color changes active even when hidden
  }
}

function startColorChange() {
  if (!isOverlayActive) {
    isOverlayActive = true;
    colorChangeInterval = setInterval(changeOverlayColor, 1000);
  }
}

function changeOverlayColor() {
  const activeColor = getRandomColor();
  overlay.style.backgroundColor = activeColor;
}

function getRandomColor() {
  const colors = [
    'red', 'green', 'blue',
    'yellow', 'cyan', 'magenta',
    'orange', 'pink', 'purple',
    'lightgreen', 'lightblue', 'lightyellow', 'lightcyan', 'lightmagenta',
    'lime', 'chartreuse', 'deepskyblue', 'dodgerblue', 'crimson'
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}