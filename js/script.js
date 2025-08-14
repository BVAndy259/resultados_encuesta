// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Referencias a elementos
    const linkViviana = document.getElementById('linkViviana');
    const linkDiana = document.getElementById('linkDiana');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const surpriseLinks = document.querySelectorAll('.surprise-link');
    
    // Variables de control
    let clickCount = 0;
    let clickedLinks = new Set();
    
    // Función para mostrar el mensaje oculto
    function showHiddenMessage() {
        hiddenMessage.classList.add('show');
        
        // Añadir un efecto de confeti virtual
        createConfetti();
    }
    
    // Función para crear efecto de confeti
    function createConfetti() {
        const colors = ['#ff6b6b', '#74b9ff', '#fd79a8', '#55a3ff', '#feca57'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    top: -10px;
                    z-index: 1000;
                    pointer-events: none;
                    border-radius: 50%;
                    animation: fall ${2 + Math.random() * 3}s linear forwards;
                `;
                
                document.body.appendChild(confetti);
                
                // Remover el confetti después de la animación
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 50);
        }
    }
    
    // Añadir animación CSS para el confetti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Event listeners para los enlaces de sorpresa
    function handleSurpriseClick(event) {
        const linkId = event.target.id;
        
        if (!clickedLinks.has(linkId)) {
            clickedLinks.add(linkId);
            clickCount++;
            
            // Efecto visual al hacer clic
            event.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.target.style.transform = '';
            }, 150);
            
            // Mostrar mensaje después de hacer clic en ambos enlaces
            if (clickCount >= 2) {
                setTimeout(showHiddenMessage, 800);
            }
        }
    }
    
    // Añadir event listeners
    if (linkViviana) {
        linkViviana.addEventListener('click', handleSurpriseClick);
    }
    
    if (linkDiana) {
        linkDiana.addEventListener('click', handleSurpriseClick);
    }
    
    // Efecto de hover mejorado para todos los enlaces
    surpriseLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de ondas al hacer hover en el contenedor
    const container = document.querySelector('.container');
    
    container.addEventListener('mousemove', function(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            pointer-events: none;
        `;
        
        container.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Añadir animación de ondas
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .container {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Mensaje de bienvenida con animación
    setTimeout(() => {
        const welcomeText = document.querySelector('h1');
        welcomeText.style.animation = 'bounce 1s ease-in-out';
    }, 500);
    
    // Añadir animación de rebote
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(bounceStyle);
    
});

// Función adicional para efectos de partículas en el fondo
function createBackgroundParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${10 + Math.random() * 20}s infinite linear;
        `;
        
        document.body.appendChild(particle);
    }
}

// Animación de flotación para partículas
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Inicializar partículas cuando se carga la página
window.addEventListener('load', createBackgroundParticles);