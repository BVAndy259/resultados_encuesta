// Configuración inicial y variables globales
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const linkViviana = document.getElementById('linkViviana');
    const linkDiana = document.getElementById('linkDiana');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const surpriseLinks = document.querySelectorAll('.surprise-link');
    const container = document.querySelector('.container');
    
    // Variables de control
    let clickCount = 0;
    let clickedLinks = new Set();
    let particleInterval;
    
    // Inicializar efectos de fondo
    initializeBackgroundEffects();
    
    // Event listeners principales
    setupEventListeners();
    
    // Inicializar animaciones de entrada
    initializeEntryAnimations();
    
    // ===== FUNCIONES DE INICIALIZACIÓN =====
    
    function initializeBackgroundEffects() {
        createBackgroundParticles();
        startFloatingEmojis();
    }
    
    function setupEventListeners() {
        // Eventos para enlaces de sorpresa
        if (linkViviana) {
            linkViviana.addEventListener('click', handleSurpriseClick);
        }
        
        if (linkDiana) {
            linkDiana.addEventListener('click', handleSurpriseClick);
        }
        
        // Efectos de hover mejorados
        surpriseLinks.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
            link.addEventListener('mousedown', handleLinkPress);
            link.addEventListener('mouseup', handleLinkRelease);
        });
        
        // Efectos del contenedor
        if (container) {
            container.addEventListener('mousemove', handleContainerMouseMove);
            container.addEventListener('mouseenter', handleContainerHover);
            container.addEventListener('mouseleave', handleContainerLeave);
        }
        
        // Eventos de teclado para accesibilidad
        document.addEventListener('keydown', handleKeyboard);
    }
    
    function initializeEntryAnimations() {
        // Animación escalonada de elementos
        const elements = [
            { selector: 'h1', delay: 300 },
            { selector: 'p', delay: 800 },
            { selector: '#linkViviana', delay: 1200 },
            { selector: '#linkDiana', delay: 1400 },
        ];
        
        elements.forEach(({ selector, delay }) => {
            const element = document.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }
    
    // ===== MANEJADORES DE EVENTOS =====
    
    function handleSurpriseClick(event) {
        const linkId = event.target.id;
        
        if (!clickedLinks.has(linkId)) {
            clickedLinks.add(linkId);
            clickCount++;
            
            // Efectos visuales al hacer clic
            createClickEffect(event.target);
            playClickAnimation(event.target);
            
            // Mostrar mensaje después de ambos clics
            if (clickCount >= 2) {
                setTimeout(() => {
                    showHiddenMessage();
                    createCelebrationEffect();
                }, 800);
            }
        }
    }
    
    function handleLinkHover(event) {
        const link = event.target;
        link.style.transform = 'translateY(-8px) scale(1.02)';
        
        // Efecto de partículas al hover
        createHoverParticles(link);
    }
    
    function handleLinkLeave(event) {
        const link = event.target;
        link.style.transform = 'translateY(0) scale(1)';
    }
    
    function handleLinkPress(event) {
        event.target.style.transform = 'translateY(-4px) scale(0.98)';
    }
    
    function handleLinkRelease(event) {
        event.target.style.transform = 'translateY(-8px) scale(1.02)';
    }
    
    function handleContainerMouseMove(event) {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Crear ondas sutiles
        createRippleEffect(x, y);
        
        // Efecto de paralaje sutil
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        container.style.transform = `
            translateY(-5px) 
            rotateX(${deltaY * 2}deg) 
            rotateY(${deltaX * 2}deg)
        `;
    }
    
    function handleContainerHover() {
        container.style.transition = 'transform 0.3s ease';
    }
    
    function handleContainerLeave() {
        container.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        container.style.transition = 'transform 0.5s ease';
    }
    
    function handleKeyboard(event) {
        // Atajos de teclado para accesibilidad
        if (event.key === 'Enter' || event.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('surprise-link')) {
                focusedElement.click();
            }
        }
    }
    
    // ===== EFECTOS VISUALES =====
    
    function showHiddenMessage() {
        if (hiddenMessage) {
            hiddenMessage.classList.add('show');
            
            // Animación especial para el mensaje
            setTimeout(() => {
                hiddenMessage.style.animation = 'messageGlow 2s ease-in-out';
            }, 500);
        }
    }
    
    function createClickEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Crear efecto de explosión
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${getRandomColor()};
                border-radius: 50%;
                left: ${centerX}px;
                top: ${centerY}px;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(particle);
            
            // Animar partícula
            animateClickParticle(particle, i);
        }
    }
    
    function animateClickParticle(particle, index) {
        const angle = (Math.PI * 2 * index) / 12;
        const velocity = 50 + Math.random() * 50;
        const gravity = 0.8;
        let velocityX = Math.cos(angle) * velocity;
        let velocityY = Math.sin(angle) * velocity;
        let posX = parseFloat(particle.style.left);
        let posY = parseFloat(particle.style.top);
        
        function animate() {
            velocityY += gravity;
            posX += velocityX * 0.02;
            posY += velocityY * 0.02;
            velocityX *= 0.98;
            velocityY *= 0.98;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = Math.max(0, parseFloat(particle.style.opacity || 1) - 0.02);
            
            if (parseFloat(particle.style.opacity || 1) > 0 && posY < window.innerHeight + 100) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
    
    function playClickAnimation(element) {
        element.style.animation = 'clickPulse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
    
    function createRippleEffect(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'container-ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(0);
            animation: ripple 0.8s linear;
            left: ${x - 15}px;
            top: ${y - 15}px;
            width: 30px;
            height: 30px;
            pointer-events: none;
            z-index: 0;
        `;
        
        container.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }
    
    function createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.bottom}px;
                    z-index: 1000;
                    pointer-events: none;
                    animation: hoverParticle 1.5s ease-out forwards;
                `;
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 100);
        }
    }
    
    function createCelebrationEffect() {
        const celebrationEmojis = ['🎉', '🎊', '✨', '🌟', '💖', '🥳', '🎈', '🎁'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    font-size: ${1 + Math.random()}rem;
                    left: ${Math.random() * 100}vw;
                    top: -50px;
                    z-index: 1000;
                    pointer-events: none;
                    animation: celebrate ${2 + Math.random() * 3}s linear forwards;
                `;
                
                document.body.appendChild(emoji);
                
                setTimeout(() => emoji.remove(), 5000);
            }, i * 50);
        }
    }
    
    function createBackgroundParticles() {
        const particleCount = 15;
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            particle.style.cssText = `
                position: fixed;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: rgba(255, 255, 255, ${0.1 + Math.random() * 0.2});
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: floatUp ${15 + Math.random() * 20}s infinite linear;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 35000);
        }
        
        // Crear partículas iniciales
        for (let i = 0; i < particleCount; i++) {
            setTimeout(createParticle, i * 500);
        }
        
        // Continuar creando partículas
        particleInterval = setInterval(createParticle, 2000);
    }
    
    function startFloatingEmojis() {
        const floatingEmojis = ['💝', '🌸', '🦋', '⭐', '💫'];
        
        function createFloatingEmoji() {
            const emoji = document.createElement('div');
            emoji.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
            emoji.style.cssText = `
                position: fixed;
                font-size: 1.2rem;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                z-index: -1;
                pointer-events: none;
                animation: emojiFloat ${20 + Math.random() * 15}s linear infinite;
                opacity: ${0.3 + Math.random() * 0.4};
            `;
            
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 35000);
        }
        
        setInterval(createFloatingEmoji, 3000);
    }
    
    // ===== FUNCIONES UTILITARIAS =====
    
    function getRandomColor() {
        const colors = ['#ff9a9e', '#fad0c4', '#a8edea', '#fed6e3', '#ffecd2', '#fcb69f'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // ===== ESTILOS DINÁMICOS =====
    
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes clickPulse {
                0% { transform: translateY(-8px) scale(1.02); }
                50% { transform: translateY(-12px) scale(1.1); }
                100% { transform: translateY(-8px) scale(1.02); }
            }
            
            @keyframes hoverParticle {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100px) scale(0);
                }
            }
            
            @keyframes celebrate {
                0% {
                    opacity: 0;
                    transform: translateY(-50px) rotate(0deg);
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(100vh) rotate(720deg);
                }
            }
            
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-120vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes emojiFloat {
                0% {
                    transform: translateY(0) rotate(0deg);
                }
                100% {
                    transform: translateY(-120vh) rotate(180deg);
                }
            }
            
            @keyframes messageGlow {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(255, 154, 158, 0.3);
                }
                50% {
                    box-shadow: 0 0 40px rgba(255, 154, 158, 0.6);
                }
            }
            
            .container {
                transform-style: preserve-3d;
                perspective: 1000px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar estilos dinámicos
    addDynamicStyles();
    
    // ===== LIMPIEZA =====
    
    // Limpiar intervalos cuando se abandona la página
    window.addEventListener('beforeunload', () => {
        if (particleInterval) {
            clearInterval(particleInterval);
        }
    });
});

// ===== FUNCIONES GLOBALES =====

// Función para celebración manual (disponible en consola)
window.celebrate = function() {
    const container = document.querySelector('.container');
    if (container) {
        container.style.animation = 'bounce 1s ease-in-out 3';
    }
    
    // Crear efectos especiales
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = ['🎉', '🎊', '✨'][Math.floor(Math.random() * 3)];
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -50px;
                font-size: 2rem;
                z-index: 1000;
                pointer-events: none;
                animation: celebrate 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
};

// Función de debug
window.debugSurprise = function() {
    console.log('🎂 Debug de página de cumpleaños:');
    console.log('- Enlaces clickeados:', document.querySelectorAll('.surprise-link').length);
    console.log('- Mensaje oculto visible:', document.getElementById('hiddenMessage').classList.contains('show'));
    console.log('- Partículas activas:', document.querySelectorAll('.bg-particle').length);
};

console.log('🎉 Sistema de sorpresa de cumpleaños cargado exitosamente! 🎂');