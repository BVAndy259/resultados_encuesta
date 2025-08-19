class ParticleSystem {
  constructor() {
    this.particles = [];
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
    this.createParticles(150);
    this.animate();
    this.addEventListeners();
  }

  setupCanvas() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.prepend(this.canvas);
  }

  createParticles(count) {
    const colors = ['#ff2a6d', '#05d9e8', '#d300c5', '#a5ff16'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        sway: Math.random() * 0.2 - 0.1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      
      // Movement with slight randomness
      particle.x += particle.speedX + Math.sin(Date.now() * 0.001) * particle.sway;
      particle.y += particle.speedY + Math.cos(Date.now() * 0.001) * particle.sway;
      
      // Wrap around edges
      if (particle.x > this.canvas.width + 20) particle.x = -20;
      if (particle.x < -20) particle.x = this.canvas.width + 20;
      if (particle.y > this.canvas.height + 20) particle.y = -20;
      if (particle.y < -20) particle.y = this.canvas.height + 20;
    });
    
    requestAnimationFrame(() => this.animate());
  }

  addEventListeners() {
    const container = document.querySelector('.container');
    
    container.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Repel particles from mouse
      this.particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100 * 5;
          particle.x -= dx / distance * force;
          particle.y -= dy / distance * force;
        }
      });
    });
    
    // Add explosion on click
    container.addEventListener('click', (e) => {
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          color: ['#ff2a6d', '#05d9e8', '#d300c5'][i % 3],
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          sway: Math.random() * 0.3
        });
      }
    });
  }
}

// Audio Visualizer
class AudioVisualizer {
  constructor() {
    this.audio = document.getElementById('birthday-audio');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.analyser = null;
    this.dataArray = null;
    this.setup();
    if (this.audio) this.initAudio();
  }

  setup() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.bottom = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100px';
    this.canvas.style.zIndex = '10';
    this.canvas.style.opacity = '0.7';
    document.body.appendChild(this.canvas);
    this.canvas.width = window.innerWidth;
    this.canvas.height = 100;
  }

  initAudio() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(this.audio);
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    source.connect(this.analyser);
    this.analyser.connect(audioContext.destination);
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    
    this.audio.play().catch(e => {
      console.log('Audio playback prevented:', e);
      const playButton = document.createElement('button');
      playButton.textContent = 'Play Music';
      playButton.style.position = 'fixed';
      playButton.style.top = '10px';
      playButton.style.right = '10px';
      playButton.style.zIndex = '100';
      playButton.addEventListener('click', () => {
        audioContext.resume();
        this.audio.play();
        playButton.remove();
      });
      document.body.appendChild(playButton);
    });
    
    this.visualize();
  }

  visualize() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.analyser.getByteFrequencyData(this.dataArray);
    
    const sliceWidth = this.canvas.width / this.analyser.frequencyBinCount;
    let x = 0;
    
    this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = `hsl(${Date.now()/50 % 360}, 100%, 50%)`;
    this.ctx.beginPath();
    
    for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
      const v = this.dataArray[i] / 255;
      const y = v * this.canvas.height;
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    this.ctx.lineTo(this.canvas.width, this.canvas.height/2);
    this.ctx.stroke();
    
    requestAnimationFrame(() => this.visualize());
  }
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem();
  new AudioVisualizer();
  
  // Floating emoji animation
  const emojis = ['🎂', '🎉', '🎈', '✨', '🌟', '💖', '🥳'];
  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.left = `${Math.random() * 100}vw`;
    emoji.style.top = `${Math.random() * 100}vh`;
    emoji.style.fontSize = `${Math.random() * 20 + 10}px`;
    emoji.style.pointerEvents = 'none';
    emoji.style.animation = `float ${Math.random() * 3 + 2}s linear forwards`;
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 5000);
  }, 300);

  // Add keyframe animation for emojis
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      to { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});
