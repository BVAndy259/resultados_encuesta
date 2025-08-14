// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const birthdayAudio = document.getElementById('birthday-audio');
    const container = document.querySelector('.container');
    const birthdayImage = document.querySelector('.birthday-image');
    const surpriseLink = document.querySelector('.surprise-link');
    
    // Configuración de audio
    if (birthdayAudio) {
        birthdayAudio.volume = 0.3; // Volumen bajo para no ser molesto
        
        // Intentar reproducir el audio (algunos navegadores lo bloquean)
        birthdayAudio.play().catch(function(error) {
            console.log('Autoplay bloqueado:', error);
            // Crear botón para activar música manualmente si es necesario
            createMusicButton();
        });
    }
    
    // Crear botón de música si el autoplay está bloqueado
    function createMusicButton() {
        const musicButton = document.createElement('button');
        musicButton.innerHTML = '🎵 Activar música';
        musicButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(116, 185, 255, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        musicButton.addEventListener('click', function() {
            if (birthdayAudio) {
                if (birthdayAudio.paused) {
                    birthdayAudio.play();
                    musicButton.innerHTML = '🎵 Pausar música';
                } else {
                    birthdayAudio.pause();
                    musicButton.innerHTML = '🎵 Activar música';
                }
            }
        });
        
        musicButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 25px rgba(116, 185, 255, 0.4)';
        });
        
        musicButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(116, 185, 255, 0.3)';
        });
        
        document.body.appendChild(musicButton);
    }
    
    // Función para crear emojis flotantes
    function createFloatingEmoji() {
        const emojis = ['🎂', '🎉', '🎈', '✨', '🌟', '💫', '🎊', '🥳', '🎁', '💖'];
        const emoji = document.createElement('div');
        emoji.classList.add('floating-emoji');
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (4 + Math.random() * 4) + 's';
        emoji.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(emoji);
        
        // Remover emoji después de la animación
        setTimeout(() => {
            emoji.remove();
        }, 8000);
    }
    
    // Crear emojis flotantes periódicamente
    function startFloatingEmojis() {
        setInterval(createFloatingEmoji, 1500);
        
        // Crear algunos emojis inmediatamente
        for (let i = 0; i < 5; i++) {
            setTimeout(createFloatingEmoji, i * 300);
        }
    }
    
    // Iniciar emojis flotantes después de un delay
    setTimeout(startFloatingEmojis, 2000);
    
    // Efecto de confeti al hacer clic en la imagen de cumpleaños
    if (birthdayImage) {
        birthdayImage.addEventListener('click', function() {
            createConfettiExplosion(event.target);
        });
    }
    
    // Función para crear explosión de confeti
    function createConfettiExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const colors = ['#ff6b6b', '#74b9ff', '#fd79a8', '#55a3ff', '#feca57', '#00b894'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${centerX}px;
                top: ${centerY}px;
                z-index: 1000;
                pointer-events: none;
                border-radius: 50%;
            `;
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 50 + Math.random() * 100;
            const gravity = 0.5;
            let velocityX = Math.cos(angle) * velocity;
            let velocityY = Math.sin(angle) * velocity;
            let posX = centerX;
            let posY = centerY;
            
            document.body.appendChild(confetti);
            
            function animate() {
                velocityY += gravity;
                posX += velocityX * 0.02;
                posY += velocityY * 0.02;
                velocityX *= 0.99;
                velocityY *= 0.99;
                
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.transform = `rotate(${posX + posY}deg)`;
                
                if (posY < window.innerHeight + 100) {
                    requestAnimationFrame(animate);
                } else {
                    confetti.remove();
                }
            }
            
            animate();
        }
    }
    
    // Efectos de hover mejorados
    if (container) {
        container.addEventListener('mousemove', function(e) {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Crear ondas sutiles
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(116, 185, 255, 0.1);
                transform: scale(0);
                animation: ripple 1s linear;
                left: ${x - 10}px;
                top: ${y - 10}px;
                width: 20px;
                height: 20px;
                pointer-events: none;
                z-index: 0;
            `;
            
            container.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }
    
    // Animación especial para los elementos de la lista
    const listItems = document.querySelectorAll('.card li');
    listItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.05)';
            this.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.textShadow = 'none';
        });
    });
    
    // Efecto especial para la cita
    const quote = document.querySelector('.quote');
    if (quote) {
        quote.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
            
            // Crear corazones flotantes
            createHeartFloating(quote);
        });
    }
    
    // Función para crear corazones flotantes
    function createHeartFloating(element) {
        const rect = element.getBoundingClientRect();
        const hearts = ['💖', '💕', '💗', '💓', '💝'];
        
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + rect.height}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: heartFloat 3s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    }
    
    // Añadir estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
        
        @keyframes heartFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0.5);
            }
            20% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mensaje de bienvenida en consola
    console.log('🎉 ¡Página especial de cumpleaños para Diana cargada! 🎂');
    
    // Efecto de typing para el título (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de typing al título después de la animación inicial
    setTimeout(() => {
        const title = document.querySelector('h1');
        if (title) {
            const originalText = title.textContent;
            typeWriter(title, originalText, 150);
        }
    }, 2000);
});

// Función para manejar la visibilidad de la página
document.addEventListener('visibilitychange', function() {
    const birthdayAudio = document.getElementById('birthday-audio');
    
    if (birthdayAudio) {
        if (document.hidden) {
            birthdayAudio.pause();
        } else {
            birthdayAudio.play().catch(function(error) {
                console.log('No se pudo reanudar la música:', error);
            });
        }
    }
});

// Funciones adicionales para efectos especiales
window.celebrateDiana = function() {
    // Función global para celebrar (puede ser llamada desde la consola)
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingEmoji();
        }, i * 100);
    }
};

// Easter egg: Konami code para sorpresa extra
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Activar sorpresa secreta
        document.body.style.animation = 'rainbow 2s ease-in-out infinite';
        alert('🎊 ¡Código secreto activado! ¡Feliz cumpleaños Diana! 🎊');
        window.celebrateDiana();
        
        // Añadir animación rainbow
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        // Resetear después de 10 segundos
        setTimeout(() => {
            document.body.style.animation = '';
            konamiCode = [];
        }, 10000);
    }
});