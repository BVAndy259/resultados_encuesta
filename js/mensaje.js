// JavaScript mejorado para la página de mensaje final
document.addEventListener('DOMContentLoaded', function() {
    
    // Referencias a elementos del DOM
    const finalButton = document.getElementById('finalButton');
    const container = document.querySelector('.container');
    const title = document.querySelector('h1');
    const message = document.querySelector('p');
    
    // Variables de control
    let clickCount = 0;
    let specialEffectsActive = false;
    let heartInterval = null;
    
    // Inicialización
    initializePage();
    setupInteractions();
    startBackgroundEffects();
    
    // ===== INICIALIZACIÓN =====
    
    function initializePage() {
        // Crear efecto de entrada especial
        setTimeout(() => {
            createWelcomeEffect();
        }, 500);
        
        // Inicializar efectos de fondo
        setTimeout(() => {
            startFloatingElements();
        }, 1500);
        
        // Mejorar accesibilidad
        if (finalButton) {
            finalButton.setAttribute('role', 'button');
            finalButton.setAttribute('tabindex', '0');
        }
    }
    
    function setupInteractions() {
        if (finalButton) {
            finalButton.addEventListener('click', handleFinalButtonClick);
            finalButton.addEventListener('mouseenter', handleButtonHover);
            finalButton.addEventListener('mouseleave', handleButtonLeave);
            finalButton.addEventListener('mousedown', handleButtonPress);
            finalButton.addEventListener('mouseup', handleButtonRelease);
            
            // Soporte para teclado
            finalButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFinalButtonClick();
                }
            });
        }
        
        // Efectos del contenedor
        if (container) {
            container.addEventListener('mousemove', handleContainerMouseMove);
            container.addEventListener('click', handleContainerClick);
        }
        
        // Efectos del título
        if (title) {
            title.addEventListener('mouseenter', handleTitleHover);
            title.style.cursor = 'pointer';
        }
        
        // Efectos del mensaje
        if (message) {
            message.addEventListener('click', handleMessageClick);
            message.style.cursor = 'pointer';
        }
    }
    
    // ===== MANEJADORES DE EVENTOS =====
    
    function handleFinalButtonClick() {
        clickCount++;
        
        // Crear efecto de ondas
        createButtonRipple();
        
        // Efectos especiales progresivos
        if (clickCount === 1) {
            showFirstClickMessage();
            createHeartExplosion();
        } else if (clickCount === 2) {
            showSecondClickMessage();
            createConfettiCelebration();
        } else if (clickCount === 3) {
            activateSpecialMode();
            createUltimateExplosion();
        } else {
            createRandomCelebration();
        }
        
        // Animación del botón
        finalButton.style.animation = 'buttonCelebration 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            finalButton.style.animation = '';
        }, 800);
    }
    
    function handleButtonHover() {
        if (!specialEffectsActive) {
            createButtonSparkles();
        }
    }
    
    function handleButtonLeave() {
        // Restablecer estado normal
    }
    
    function handleButtonPress() {
        finalButton.style.transform = 'translateY(-4px) scale(1.05)';
    }
    
    function handleButtonRelease() {
        finalButton.style.transform = 'translateY(-8px) scale(1.08)';
    }
    
    function handleContainerMouseMove(event) {
        if (specialEffectsActive) {
            const rect = container.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            createMagicTrail(x, y);
        }
    }
    
    function handleContainerClick(event) {
        if (event.target !== finalButton) {
            createClickEffect(event.clientX, event.clientY);
        }
    }
    
    function handleTitleHover() {
        title.style.textShadow = '0 0 30px rgba(255, 206, 207, 0.8)';
        createTitleEffect();
    }
    
    function handleMessageClick() {
        createMessageHearts();
        message.style.animation = 'messageGlow 2s ease-in-out';
    }
    
    // ===== EFECTOS VISUALES =====
    
    function createWelcomeEffect() {
        const welcomeText = document.createElement('div');
        welcomeText.innerHTML = 'Mensaje especial para ustedes dos ✨';
        welcomeText.style.cssText = `
            position: fixed;
            top: 15%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.5rem;
            font-weight: 600;
            background: linear-gradient(135deg, #ffecd2, #fcb69f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            z-index: 10000;
            pointer-events: none;
            animation: welcomeMessage 4s ease-in-out forwards;
            text-align: center;
            padding: 0 2rem;
        `;
        
        document.body.appendChild(welcomeText);
        setTimeout(() => welcomeText.remove(), 4000);
    }
    
    function showFirstClickMessage() {
        const msg = createFloatingMessage('¡Gracias por hacer que esta sorpresa sea especial! 💖', '#ff9a9e');
    }
    
    function showSecondClickMessage() {
        const msg = createFloatingMessage('Viviana y Diana, son increíbles! 🌟', '#a8edea');
    }
    
    function createFloatingMessage(text, color) {
        const message = document.createElement('div');
        message.innerHTML = text;
        message.style.cssText = `
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            background: ${color};
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
            animation: floatingMessageShow 3.5s ease-in-out forwards;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            max-width: 80%;
            text-align: center;
        `;
        
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3500);
    }
    
    function createButtonRipple() {
        const rect = finalButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            animation: buttonRipple 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }
    
    function createButtonSparkles() {
        const rect = finalButton.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = ['✨', '⭐', '💫'][Math.floor(Math.random() * 3)];
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    font-size: 1rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: buttonSparkle 2s ease-out forwards;
                `;
                
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 2000);
            }, i * 100);
        }
    }
    
    function createHeartExplosion() {
        const rect = finalButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const hearts = ['💖', '💕', '💗', '💓', '💝'];
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(heart);
            animateHeartExplosion(heart, i);
        }
    }
    
    function animateHeartExplosion(heart, index) {
        const angle = (Math.PI * 2 * index) / 20;
        const velocity = 50 + Math.random() * 70;
        const gravity = 0.5;
        let velocityX = Math.cos(angle) * velocity;
        let velocityY = Math.sin(angle) * velocity;
        let posX = parseFloat(heart.style.left);
        let posY = parseFloat(heart.style.top);
        let rotation = 0;
        let scale = 1;
        
        function animate() {
            velocityY += gravity;
            posX += velocityX * 0.02;
            posY += velocityY * 0.02;
            velocityX *= 0.98;
            velocityY *= 0.98;
            rotation += 8;
            scale *= 0.995;
            
            heart.style.left = posX + 'px';
            heart.style.top = posY + 'px';
            heart.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            heart.style.opacity = Math.max(0, scale);
            
            if (scale > 0.1 && posY < window.innerHeight + 100) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        }
        
        animate();
    }
    
    function createConfettiCelebration() {
        const colors = ['#ff9a9e', '#fad0c4', '#a8edea', '#fed6e3', '#ffecd2', '#fcb69f'];
        
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    top: -20px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
                `;
                
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 5000);
            }, i * 50);
        }
    }
    
    function activateSpecialMode() {
        specialEffectsActive = true;
        
        // Cambiar el texto del botón
        finalButton.innerHTML = '¡Modo especial activado! 🎉';
        
        // Crear efectos continuos
        heartInterval = setInterval(createFloatingHeart, 500);
        
        // Efecto especial en el contenedor
        container.style.background = `
            ${container.style.background || 'rgba(255, 255, 255, 0.96)'}, 
            linear-gradient(45deg, rgba(255, 154, 158, 0.1), rgba(168, 237, 234, 0.1))
        `;
        container.style.animation = 'specialModeActivated 2s ease-in-out';
        
        // Mostrar mensaje especial
        const specialMsg = document.createElement('div');
        specialMsg.innerHTML = '¡Ahora pueden mover el mouse por la pantalla para crear magia! ✨';
        specialMsg.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
            color: white;
            padding: 1rem 2rem;
            border-radius: 20px;
            font-size: 1rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: specialModeNotice 5s ease-in-out forwards;
            text-align: center;
            max-width: 80%;
        `;
        
        document.body.appendChild(specialMsg);
        setTimeout(() => specialMsg.remove(), 5000);
    }
    
    function createUltimateExplosion() {
        // Crear múltiples efectos simultáneamente
        createConfettiCelebration();
        
        setTimeout(() => createHeartExplosion(), 200);
        setTimeout(() => createStarBurst(), 400);
        setTimeout(() => createColorfulExplosion(), 600);
    }
    
    function createStarBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 25; i++) {
            const star = document.createElement('div');
            star.textContent = ['⭐', '✨', '💫'][Math.floor(Math.random() * 3)];
            star.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 2rem;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(star);
            animateStarBurst(star, i);
        }
    }
    
    function animateStarBurst(star, index) {
        const angle = (Math.PI * 2 * index) / 25;
        const distance = 200 + Math.random() * 300;
        const endX = parseFloat(star.style.left) + Math.cos(angle) * distance;
        const endY = parseFloat(star.style.top) + Math.sin(angle) * distance;
        
        setTimeout(() => {
            star.style.left = endX + 'px';
            star.style.top = endY + 'px';
            star.style.transform = 'scale(2) rotate(720deg)';
            star.style.opacity = '0';
            star.style.transition = 'all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 100);
        
        setTimeout(() => star.remove(), 2100);
    }
    
    function createColorfulExplosion() {
        const emojis = ['🎉', '🎊', '🌟', '💖', '🦋', '🌸', '✨', '💝'];
        
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    font-size: ${1.5 + Math.random()}rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: emojiCelebration ${3 + Math.random() * 2}s ease-out forwards;
                `;
                
                document.body.appendChild(emoji);
                setTimeout(() => emoji.remove(), 5000);
            }, i * 75);
        }
    }
    
    function createRandomCelebration() {
        const celebrations = [
            createHeartRain,
            createSparkleWave,
            createFloatingMessages
        ];
        
        const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
        randomCelebration();
    }
    
    function createHeartRain() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }
    
    function createSparkleWave() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${i * (window.innerWidth / 20)}px;
                    top: -20px;
                    font-size: 1.5rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: sparkleWave 4s ease-out forwards;
                `;
                
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 4000);
            }, i * 50);
        }
    }
    
    function createFloatingMessages() {
        const messages = [
            '¡Son increíbles! 💖',
            '¡Amistad forever! ✨',
            '¡Las quiero mucho! 🌟',
            '¡Gracias por todo! 💝'
        ];
        
        messages.forEach((msg, index) => {
            setTimeout(() => {
                const floatingMsg = document.createElement('div');
                floatingMsg.innerHTML = msg;
                floatingMsg.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 80 + 10}%;
                    top: 100vh;
                    background: linear-gradient(135deg, #ff9a9e, #fad0c4);
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border-radius: 20px;
                    font-size: 1rem;
                    font-weight: 600;
                    pointer-events: none;
                    z-index: 1000;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    animation: messageFloat 5s ease-out forwards;
                `;
                
                document.body.appendChild(floatingMsg);
                setTimeout(() => floatingMsg.remove(), 5000);
            }, index * 800);
        });
    }
    
    function createMagicTrail(x, y) {
        const trail = document.createElement('div');
        trail.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
        trail.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: 1rem;
            pointer-events: none;
            z-index: 999;
            animation: trailMagic 2s ease-out forwards;
        `;
        
        container.appendChild(trail);
        setTimeout(() => trail.remove(), 2000);
    }
    
    function createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.textContent = '💖';
        effect.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 2rem;
            pointer-events: none;
            z-index: 1000;
            animation: clickHeart 1.5s ease-out forwards;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 1500);
    }
    
    function createTitleEffect() {
        const rect = title.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.textContent = '✨';
                star.style.cssText = `
                    position: fixed;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top - 20}px;
                    font-size: 1rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: titleStars 2s ease-out forwards;
                `;
                
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 2000);
            }, i * 100);
        }
    }
    
    function createMessageHearts() {
        const rect = message.getBoundingClientRect();
        const hearts = ['💖', '💕', '💗'];
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.bottom}px;
                    font-size: 1.2rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: messageHeartFloat 3s ease-out forwards;
                `;
                
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 3000);
            }, i * 200);
        }
    }
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.textContent = ['💖', '💕', '💗', '💓'][Math.floor(Math.random() * 4)];
        heart.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            font-size: ${1 + Math.random() * 0.5}rem;
            pointer-events: none;
            z-index: 1000;
            animation: floatingHeart 6s linear forwards;
        `;
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }
    
    function startFloatingElements() {
        const elements = ['💝', '🌸', '✨', '🦋'];
        
        function createElement() {
            const element = document.createElement('div');
            element.textContent = elements[Math.floor(Math.random() * elements.length)];
            element.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                font-size: 1rem;
                pointer-events: none;
                z-index: 1;
                opacity: 0.6;
                animation: elementFloat 15s linear infinite;
            `;
            
            document.body.appendChild(element);
            setTimeout(() => element.remove(), 15000);
        }
        
        setInterval(createElement, 3000);
        
        for (let i = 0; i < 3; i++) {
            setTimeout(createElement, i * 1000);
        }
    }
    
    function startBackgroundEffects() {
        setTimeout(() => {
            document.body.style.backgroundImage = `
                ${document.body.style.backgroundImage}, 
                radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `;
        }, 2000);
    }
    
    // ===== ESTILOS DINÁMICOS =====
    
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes welcomeMessage {
                0% { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.8); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.05); }
                25% { transform: translateX(-50%) translateY(0) scale(1); }
                90% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.9); }
            }
            
            @keyframes floatingMessageShow {
                0% { opacity: 0; transform: translateX(-50%) translateY(30px) scale(0.8); }
                15% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.05); }
                20% { transform: translateX(-50%) translateY(0) scale(1); }
                85% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.8); }
            }
            
            @keyframes buttonCelebration {
                0% { transform: translateY(-8px) scale(1.08); }
                25% { transform: translateY(-15px) scale(1.15) rotate(5deg); }
                50% { transform: translateY(-12px) scale(1.1) rotate(-3deg); }
                75% { transform: translateY(-10px) scale(1.12) rotate(2deg); }
                100% { transform: translateY(-8px) scale(1.08) rotate(0deg); }
            }
            
            @keyframes buttonRipple {
                0% { width: 0; height: 0; opacity: 0.8; }
                100% { width: 300px; height: 300px; opacity: 0; }
            }
            
            @keyframes buttonSparkle {
                0% { opacity: 1; transform: scale(1) rotate(0deg); }
                100% { opacity: 0; transform: scale(2) rotate(360deg); }
            }
            
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
            
            @keyframes specialModeActivated {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.02) rotate(1deg); }
                50% { transform: scale(1.05) rotate(0deg); }
                75% { transform: scale(1.02) rotate(-1deg); }
            }
            
            @keyframes specialModeNotice {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
            
            @keyframes emojiCelebration {
                0% { opacity: 0; transform: translateY(0) scale(0.5) rotate(0deg); }
                15% { opacity: 1; transform: translateY(-50px) scale(1) rotate(45deg); }
                100% { opacity: 0; transform: translateY(-120vh) scale(1.5) rotate(360deg); }
            }
            
            @keyframes sparkleWave {
                0% { opacity: 1; transform: translateY(0) rotate(0deg); }
                100% { opacity: 0; transform: translateY(100vh) rotate(270deg); }
            }
            
            @keyframes messageFloat {
                0% { opacity: 0; transform: translateY(0) scale(0.8); }
                15% { opacity: 1; transform: translateY(-30px) scale(1); }
                100% { opacity: 0; transform: translateY(-120vh) scale(1.2); }
            }
            
            @keyframes trailMagic {
                0% { opacity: 1; transform: scale(1) rotate(0deg); }
                100% { opacity: 0; transform: scale(2.5) rotate(180deg); }
            }
            
            @keyframes clickHeart {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
            }
            
            @keyframes titleStars {
                0% { opacity: 1; transform: translateY(0) scale(1); }
                100% { opacity: 0; transform: translateY(-60px) scale(1.8) rotate(180deg); }
            }
            
            @keyframes messageHeartFloat {
                0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
                100% { opacity: 0; transform: translateY(-80px) scale(1.5) rotate(180deg); }
            }
            
            @keyframes floatingHeart {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(-110vh) rotate(360deg); }
            }
            
            @keyframes elementFloat {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(-110vh) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar estilos
    addDynamicStyles();
    
    // ===== LIMPIEZA =====
    
    window.addEventListener('beforeunload', () => {
        if (heartInterval) {
            clearInterval(heartInterval);
        }
    });
    
    // ===== FUNCIONES GLOBALES =====
    
    window.ultimateCelebration = function() {
        console.log('¡Celebración máxima activada para ambas!');
        
        activateSpecialMode();
        createUltimateExplosion();
        
        setTimeout(() => createRandomCelebration(), 1000);
        setTimeout(() => createRandomCelebration(), 2500);
        setTimeout(() => createRandomCelebration(), 4000);
        
        container.style.animation = 'specialModeActivated 3s ease-in-out infinite';
        setTimeout(() => {
            container.style.animation = '';
        }, 15000);
    };
    
    console.log('Página de mensaje final cargada completamente!');
});
