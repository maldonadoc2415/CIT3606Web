
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const squishSound = document.getElementById('squishSound');
    const buzzSound = document.getElementById('buzzSound');

    // Fly image
    const flyImage = new Image();
    flyImage.src = 'fly.png'
    // Bee image
    const beeImage = new Image();
    beeImage.src = 'bee.png';

    // Game state
    let score = 0;

    const fly = { x: 0, y: 0, size: 40, visible: false };
    const bee = { x: 0, y: 0, size: 50, visible: false };

    // Helper: random position
    function randomPosition(padding = 50) {
      return {
        x: Math.random() * (canvas.width - 2 * padding) + padding,
        y: Math.random() * (canvas.height - 2 * padding) + padding
      };
    }

    // Draw all elements
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fly
      if (fly.visible) {
        ctx.drawImage(flyImage, fly.x - fly.size / 2, fly.y - fly.size / 2, fly.size, fly.size);
      }

      // Draw bee
      if (bee.visible) {
        ctx.drawImage(beeImage, bee.x - bee.size / 2, bee.y - bee.size / 2, bee.size, bee.size);
      }

      // Score
      ctx.fillStyle = '#333';
      ctx.font = '20px Arial';
      ctx.fillText('Score: ' + score, 10, 25);
    }

    //  Spawn fly
    function spawnFly() {
      const pos = randomPosition();
      fly.x = pos.x;
      fly.y = pos.y;
      fly.visible = true;
      draw();
    }

    //  Spawn bee
    function spawnBee() {
      const pos = randomPosition();
      bee.x = pos.x;
      bee.y = pos.y;
      bee.visible = true;
      buzzSound.currentTime = 0;
      buzzSound.play();
      draw();

      // Bee disappears after a few seconds
      setTimeout(() => {
        bee.visible = false;
        draw();
      }, 2000 + Math.random() * 1000);
    }

    // Handle click (swat)
    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      // Check fly
      if (fly.visible) {
        const dx = clickX - fly.x;
        const dy = clickY - fly.y;
        if (Math.sqrt(dx * dx + dy * dy) < fly.size / 2) {
          fly.visible = false;
          score += 1;
          squishSound.currentTime = 0;
          squishSound.play();
          alert('Squished! +1 point');
          draw();
          setTimeout(spawnFly, 800);
          return; 
        }
      }

      // Check bee
      if (bee.visible) {
        const dx = clickX - bee.x;
        const dy = clickY - bee.y;
        if (Math.sqrt(dx * dx + dy * dy) < bee.size / 2) {
          bee.visible = false;
          score -= 2;
          buzzSound.currentTime = 0;
          buzzSound.play();
          alert('Ouch! -2 points');
          draw();
        }
      }
    });

    // Randomly spawn bees occasionally
    setInterval(() => {
      if (!bee.visible && Math.random() < 0.3) { // 30% chance every 3 seconds
        spawnBee();
      }
    }, 3000);

    // Start game when fly image loads
    flyImage.onload = () => {
      spawnFly();
    };
  