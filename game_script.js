const square = document.getElementById('square');
let currentX = 0;
let currentY = 0;

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  const speed = 10; // Adjust speed as needed
  switch (event.key) {
    case 'ArrowUp':
      currentY -= speed;
      break;
    case 'ArrowDown':
      currentY += speed;
      break;
    case 'ArrowLeft':
      currentX -= speed;
      break;
    case 'ArrowRight':
      currentX += speed;
      break;
    default:
      // Handle other keys if needed
  }

  square.style.top = currentY + 'px';
  square.style.left = currentX + 'px';
}