document.addEventListener('DOMContentLoaded', function() {
  // Audio automático con fallback
  const audio = document.getElementById('birthday-audio');
  if (audio) {
    audio.volume = 0.3;
    const playAudio = () => {
      audio.play().catch(e => {
        console.log("Autoplay bloqueado");
        document.removeEventListener('click', playAudio);
      });
    };
    
    // Intentar reproducir al cargar (puede fallar)
    playAudio();
    
    // Reproducir al primer clic si falló
    document.addEventListener('click', playAudio, { once: true });
  }

  // Efecto de confeti al hacer clic en la imagen
  const image = document.querySelector('.birthday-image');
  if (image) {
    image.addEventListener('click', function() {
      createConfetti(this);
    });
  }

  // Generador de confeti simple
  function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ff0099', '#00ffff', '#ffcc00', '#ff6600'];
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[i % colors.length]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        top: ${rect.top + rect.height/2}px;
        left: ${rect.left + rect.width/2}px;
        z-index: 1000;
        pointer-events: none;
        transform: scale(0);
        animation: 
          confetti-fade 1s ease-out forwards,
          confetti-move ${1 + Math.random() * 1}s ease-out forwards;
      `;
      
      // Animación individual para cada confeti
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 100;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes confetti-move {
          to {
            transform: 
              translateX(${Math.cos(angle) * distance}px) 
              translateY(${Math.sin(angle) * distance - 50}px)
              rotate(${360 * 3}deg)
              scale(1);
          }
        }
        @keyframes confetti-fade {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
      
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 2000);
    }
  }
});
