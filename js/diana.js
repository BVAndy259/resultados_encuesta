// JavaScript mejorado para la página de Diana
document.addEventListener('DOMContentLoaded', function() {
    
    // Referencias a elementos del DOM
    const birthdayAudio = document.getElementById('birthday-audio');
    const container = document.querySelector('.container');
    const birthdayImage = document.querySelector('.birthday-image');
    const surpriseLink = document.querySelector('.surprise-link');
    const cardItems = document.querySelectorAll('.card li');
    const quote = document.querySelector('.quote');
    
    // Variables de control
    let musicButton = null;
    let isAudioPlaying = false;
    let interactionCount = 0;
    
    // Inicialización
    initializeAudio();
    initializeInteractions();
    initializeVisualEffects();
    initializePersonalizedContent();
    
    // ===== CONFIGURACIÓN DE AUDIO =====
    
    function initializeAudio() {
        if (birthdayAudio) {
            birthdayAudio.volume = 0.25;
            birthdayAudio.loop = true;
            
            // Intentar reproducir audio automáticamente
            const playPromise = birthdayAudio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        isAudioPlaying = true;
                        console.log('🎵 Música de cumpleaños iniciada automáticamente');
                    })
                    .catch(error => {
                        console.log('Autoplay bloqueado:', error);
                        createMusicButton();
                    });
            }
        }
    }
    
    function createMusicButton() {
        musicButton = document.createElement('button');
        musicButton.innerHTML = '🎵 Activar música de Diana';
        musicButton.setAttribute('aria-label', 'Reproducir música de cumpleaños');
        
        musicButton.style.cssText = `
            position: fixed;
            top: 25px;
            right: 25px;
            background: linear-gradient(135deg, #a8edea, #fed6e3);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 8px 25px rgba(168, 237, 234, 0.3);
            z-index: 1000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        `;
        
        // Eventos del botón de música
        musicButton.addEventListener('click', toggleMusic);
        musicButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 12px 35px rgba(168, 237, 234, 0.4)';
        });
        
        musicButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 8px 25px rgba(168, 237, 234, 0.3)';
        });
        
        document.body.appendChild(musicButton);
    }
    
    function toggleMusic() {
        if (!birthdayAudio) return;
        
        if (isAudioPlaying) {
            birthdayAudio.pause();
            musicButton.innerHTML = '🎵 Activar música';
            musicButton.style.opacity = '0.7';
            isAudioPlaying = false;
        } else {
            birthdayAudio.play();
            musicButton.innerHTML = '🎵 Pausar música';
            musicButton.style.opacity = '1';
            isAudioPlaying = true;
        }
    }
    
    // ===== INTERACCIONES MEJORADAS =====
    
    function initializeInteractions() {
        // Imagen de cumpleaños
        if (birthdayImage) {
            birthdayImage.addEventListener('click', handleImageClick);
            birthdayImage.addEventListener('mouseenter', handleImageHover);
            birthdayImage.style.cursor = 'pointer';
            
            // Agregar imagen por defecto si no existe
            if (!birthdayImage.src || birthdayImage.src.includes('placeholder')) {
                birthdayImage.src = 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=320&fit=crop&auto=format';
                birthdayImage.alt = 'Celebración especial de cumpleaños para Diana';
            }
        }
        
        // Items de la tarjeta
        cardItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => handleItemHover(item, index));
            item.addEventListener('mouseleave', () => handleItemLeave(item));
            item.addEventListener('click', () => handleItemClick(item, index));
        });
        
        // Cita inspiracional
        if (quote) {
            quote.addEventListener('click', handleQuoteClick);
            quote.style.cursor = 'pointer';
        }
        
        // Contenedor principal
        if (container) {
            container.addEventListener('mousemove', handleContainerMouseMove);
        }
        
        // Enlace de regreso
        if (surpriseLink) {
            surpriseLink.addEventListener('mouseenter', handleLinkHover);
            surpriseLink.addEventListener('click', handleLinkClick);
        }
    }
    
    function handleImageClick(event) {
        createConfettiExplosion(event.target);
        playImageClickAnimation();
        incrementInteraction();
        
        // Mensaje especial después de varios clics
        if (interactionCount === 5) {
            showSpecialMessage();
        }
    }
    
    function handleImageHover() {
        birthdayImage.style.filter = 'brightness(1.1) saturate(1.2)';
    }
    
    function handleItemHover(item, index) {
        item.style.transform = 'translateX(15px) scale(1.03)';
        item.style.textShadow = '0 3px 12px rgba(168, 237, 234, 0.5)';
        
        // Efecto de partículas suaves
        createItemParticles(item);
    }
    
    function handleItemLeave(item) {
        item.style.transform = 'translateX(0) scale(1)';
        item.style.textShadow = 'none';
    }
    
    function handleItemClick(item, index) {
        playItemAnimation(item);
        createHeartBurst(item);
        incrementInteraction();
    }
    
    function handleQuoteClick() {
        quote.style.animation = 'none';
        setTimeout(() => {
            quote.style.animation = 'quotePulse 1s ease-in-out';
        }, 10);
        
        createFloatingHearts(quote);
        incrementInteraction();
    }
    
    function handleContainerMouseMove(event) {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Crear efecto de ondas suaves
        createGentleRipple(x, y);
    }
    
    function handleLinkHover() {
        createLinkSparkles(surpriseLink);
    }
    
    function handleLinkClick(event) {
        event.preventDefault();
        
        // Animación de salida
        container.style.animation = 'containerExit 0.8s ease-in-out forwards';
        
        setTimeout(() => {
            window.location.href = surpriseLink.href;
        }, 800);
    }
    
    // ===== EFECTOS VISUALES =====
    
    function initializeVisualEffects() {
        startFloatingEmojis();
        startBackgroundAnimation();
        addPersonalizedTouchesForDiana();
    }
    
    function createConfettiExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dianaColors = ['#a8edea', '#fed6e3', '#d299c2', '#fef9d7', '#89f7fe', '#66a6ff'];
        
        for (let i = 0; i < 40; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${dianaColors[Math.floor(Math.random() * dianaColors.length)]};
                left: ${centerX}px;
                top: ${centerY}px;
                z-index: 1000;
                pointer-events: none;
                border-radius: 50%;
                box-shadow: 0 0 6px rgba(168, 237, 234, 0.6);
            `;
            
            document.body.appendChild(confetti);
            
            // Animar cada confetti
            const angle = (Math.PI * 2 * i) / 40;
            const velocity = 60 + Math.random() * 80;
            const gravity = 0.6;
            let velocityX = Math.cos(angle) * velocity;
            let velocityY = Math.sin(angle) * velocity;
            let posX = centerX;
            let posY = centerY;
            let rotation = 0;
            
            function animateConfetti() {
                velocityY += gravity;
                posX += velocityX * 0.015;
                posY += velocityY * 0.015;
                velocityX *= 0.99;
                velocityY *= 0.99;
                rotation += 3;
                
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.style.opacity = Math.max(0, parseFloat(confetti.style.opacity || 1) - 0.008);
                
                if (parseFloat(confetti.style.opacity || 1) > 0 && posY < window.innerHeight + 100) {
                    requestAnimationFrame(animateConfetti);
                } else {
                    confetti.remove();
                }
            }
            
            animateConfetti();
        }
    }
    
    function playImageClickAnimation() {
        birthdayImage.style.animation = 'imageClickBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            birthdayImage.style.animation = '';
        }, 800);
    }
    
    function createItemParticles(item) {
        const rect = item.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.textContent = '✨';
            particle.style.cssText = `
                position: fixed;
                left: ${rect.right + 10}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: 0.8rem;
                pointer-events: none;
                z-index: 1000;
                animation: itemSparkle 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }
    
    function playItemAnimation(item) {
        item.style.animation = 'itemBounce 0.6s ease-in-out';
        setTimeout(() => {
            item.style.animation = '';
        }, 600);
    }
    
    function createHeartBurst(item) {
        const rect = item.getBoundingClientRect();
        const hearts = ['💖', '💕', '💗', '💓'];
        
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 1000;
                animation: heartBurst 2.5s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 2500);
        }
    }
    
    function createFloatingHearts(element) {
        const rect = element.getBoundingClientRect();
        const specialHearts = ['💝', '💖', '🌸', '✨'];
        
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement('div');
            heart.textContent = specialHearts[Math.floor(Math.random() * specialHearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.bottom}px;
                font-size: ${1 + Math.random() * 0.5}rem;
                pointer-events: none;
                z-index: 1000;
                animation: floatingHearts 3.5s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3500);
        }
    }
    
    function createGentleRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(168, 237, 234, 0.08);
            transform: scale(0);
            animation: gentleRipple 1.2s linear;
            left: ${x - 12}px;
            top: ${y - 12}px;
            width: 24px;
            height: 24px;
            pointer-events: none;
            z-index: 0;
        `;
        
        container.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1200);
    }
    
    function createLinkSparkles(link) {
        const rect = link.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    font-size: 0.8rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: linkSparkle 1.5s ease-out forwards;
                `;
                
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1500);
            }, i * 100);
        }
    }
    
    function startFloatingEmojis() {
        const dianaEmojis = ['🌸', '💖', '✨', '🦋', '🌺', '💫', '🎀', '💝'];
        
        function createFloatingEmoji() {
            const emoji = document.createElement('div');
            emoji.textContent = dianaEmojis[Math.floor(Math.random() * dianaEmojis.length)];
            emoji.style.cssText = `
                position: fixed;
                font-size: ${1 + Math.random() * 0.5}rem;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                z-index: 1;
                pointer-events: none;
                animation: dianaEmojiFloat ${15 + Math.random() * 10}s linear infinite;
                opacity: ${0.3 + Math.random() * 0.4};
            `;
            
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 25000);
        }
        
        // Crear emojis inmediatamente
        for (let i = 0; i < 5; i++) {
            setTimeout(createFloatingEmoji, i * 500);
        }
        
        // Continuar creando emojis
        setInterval(createFloatingEmoji, 2500);
    }
    
    function startBackgroundAnimation() {
        // Efectos de fondo sutiles
        setTimeout(() => {
            document.body.style.backgroundImage = `
                ${document.body.style.backgroundImage || 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'},
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
            `;
        }, 2000);
    }
    
    // ===== CONTENIDO PERSONALIZADO =====
    
    function initializePersonalizedContent() {
        completePersonalizedList();
        addPersonalizedTouchesForDiana();
    }
    
    function completePersonalizedList() {
        const listItems = document.querySelectorAll('.card li');
        const personalizedMessages = [
            'Siempre tienes una sonrisa que ilumina el día de todos',
            'Tu creatividad y energía son verdaderamente inspiradoras',
            'Eres una amiga leal y siempre estás ahí cuando te necesitan',
            'Y porque simplemente, eres tú 💫'
        ];
        
        listItems.forEach((item, index) => {
            if (item.textContent.includes('[Escribe') || item.textContent.trim() === '') {
                if (personalizedMessages[index]) {
                    item.textContent = personalizedMessages[index];
                }
            }
        });
    }
    
    function addPersonalizedTouchesForDiana() {
        // Agregar efectos especiales después de un delay
        setTimeout(() => {
            const title = document.querySelector('h1');
            if (title) {
                title.style.textShadow = '0 0 20px rgba(168, 237, 234, 0.5)';
            }
        }, 3000);
    }
    
    function showSpecialMessage() {
        const specialMsg = document.createElement('div');
        specialMsg.textContent = '¡Diana, eres increíble! 🌟';
        specialMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #a8edea, #fed6e3);
            color: white;
            padding: 1.5rem 2.5rem;
            border-radius: 25px;
            font-size: 1.5rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(168, 237, 234, 0.4);
            animation: specialMessageAppear 3s ease-in-out forwards;
            text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(specialMsg);
        setTimeout(() => specialMsg.remove(), 3000);
    }
    
    function incrementInteraction() {
        interactionCount++;
    }
    
    // ===== ESTILOS DINÁMICOS =====
    
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes imageClickBounce {
                0% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.1) rotate(2deg); }
                50% { transform: scale(1.05) rotate(-1deg); }
                75% { transform: scale(1.08) rotate(1deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
            
            @keyframes itemBounce {
                0%, 100% { transform: translateX(0) scale(1); }
                50% { transform: translateX(20px) scale(1.05); }
            }
            
            @keyframes itemSparkle {
                0% { opacity: 1; transform: translateX(0) scale(1); }
                100% { opacity: 0; transform: translateX(30px) scale(0.5); }
            }
            
            @keyframes heartBurst {
                0% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1) rotate(0deg); 
                }
                100% { 
                    opacity: 0; 
                    transform: translateY(-80px) scale(1.5) rotate(180deg); 
                }
            }
            
            @keyframes floatingHearts {
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
                    transform: translateY(-120px) scale(0.3) rotate(360deg); 
                }
            }
            
            @keyframes gentleRipple {
                to {
                    transform: scale(6);
                    opacity: 0;
                }
            }
            
            @keyframes linkSparkle {
                0% { opacity: 1; transform: scale(1) rotate(0deg); }
                100% { opacity: 0; transform: scale(1.5) rotate(180deg); }
            }
            
            @keyframes dianaEmojiFloat {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(-120vh) rotate(360deg); }
            }
            
            @keyframes quotePulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            @keyframes containerExit {
                0% { 
                    opacity: 1; 
                    transform: scale(1) rotate(0deg); 
                }
                100% { 
                    opacity: 0; 
                    transform: scale(0.8) rotate(-5deg) translateY(50px); 
                }
            }
            
            @keyframes specialMessageAppear {
                0% { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(0.3); 
                }
                20% { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1.1); 
                }
                30% { 
                    transform: translate(-50%, -50%) scale(1); 
                }
                90% { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1); 
                }
                100% { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(0.8); 
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar estilos dinámicos
    addDynamicStyles();
    
    // ===== MANEJO DE VISIBILIDAD =====
    
    document.addEventListener('visibilitychange', function() {
        if (birthdayAudio && isAudioPlaying) {
            if (document.hidden) {
                birthdayAudio.pause();
            } else {
                birthdayAudio.play().catch(error => {
                    console.log('No se pudo reanudar la música:', error);
                });
            }
        }
    });
    
    // ===== FUNCIONES GLOBALES =====
    
    window.celebrateDiana = function() {
        console.log('🎉 Celebración especial para Diana activada!');
        
        // Crear celebración masiva
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                createFloatingEmoji();
            }, i * 80);
        }
        
        // Efecto especial en el contenedor
        container.style.animation = 'specialCelebration 2s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
        }, 2000);
        
        // Mensaje especial
        showSpecialMessage();
    };
    
    // Konami code para sorpresa extra
    let konamiSequence = [];
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiSequence.push(e.keyCode);
        
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence.shift();
        }
        
        if (konamiSequence.length === konamiCode.length && 
            konamiSequence.every((code, index) => code === konamiCode[index])) {
            
            // Sorpresa secreta activada
            document.body.style.filter = 'hue-rotate(0deg)';
            document.body.style.animation = 'rainbow 3s linear infinite';
            
            const secretStyle = document.createElement('style');
            secretStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                @keyframes specialCelebration {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    25% { transform: scale(1.05) rotate(2deg); }
                    50% { transform: scale(1.1) rotate(0deg); }
                    75% { transform: scale(1.05) rotate(-2deg); }
                }
            `;
            document.head.appendChild(secretStyle);
            
            window.celebrateDiana();
            
            setTimeout(() => {
                document.body.style.animation = '';
                document.body.style.filter = '';
                konamiSequence = [];
                secretStyle.remove();
            }, 15000);
        }
    });
    
    console.log('🎂 Página especial de Diana cargada completamente! 🌸');
});