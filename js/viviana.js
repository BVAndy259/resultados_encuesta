// JavaScript mejorado para la página de Viviana
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
    let celebrationMode = false;
    let interactionCount = 0;
    
    // Inicialización
    initializeAudio();
    initializeImage();
    initializeInteractions();
    initializeVisualEffects();
    startVivianaExperience();
    
    // ===== CONFIGURACIÓN DE AUDIO =====
    
    function initializeAudio() {
        if (birthdayAudio) {
            birthdayAudio.volume = 0.2;
            birthdayAudio.loop = true;
            
            const playPromise = birthdayAudio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        isAudioPlaying = true;
                        console.log('🎵 Música de Viviana iniciada');
                    })
                    .catch(() => {
                        createMusicButton();
                    });
            }
        }
    }
    
    function createMusicButton() {
        musicButton = document.createElement('button');
        musicButton.innerHTML = '🎵 Música para Viviana';
        musicButton.setAttribute('aria-label', 'Reproducir música de cumpleaños de Viviana');
        
        musicButton.style.cssText = `
            position: fixed;
            top: 25px;
            right: 25px;
            background: linear-gradient(135deg, #ff9a9e, #fad0c4);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 8px 25px rgba(255, 154, 158, 0.3);
            z-index: 1000;
            transition: all 0.3s ease;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        `;
        
        musicButton.addEventListener('click', toggleMusic);
        setupButtonHoverEffects(musicButton);
        
        document.body.appendChild(musicButton);
    }
    
    function toggleMusic() {
        if (!birthdayAudio) return;
        
        if (isAudioPlaying) {
            birthdayAudio.pause();
            musicButton.innerHTML = '🎵 Activar música';
            isAudioPlaying = false;
        } else {
            birthdayAudio.play();
            musicButton.innerHTML = '🎵 Pausar música';
            isAudioPlaying = true;
        }
    }
    
    function setupButtonHoverEffects(button) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05) translateY(-2px)';
            button.style.boxShadow = '0 12px 35px rgba(255, 154, 158, 0.4)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1) translateY(0)';
            button.style.boxShadow = '0 8px 25px rgba(255, 154, 158, 0.3)';
        });
    }
    
    // ===== CONFIGURACIÓN DE IMAGEN =====
    
    function initializeImage() {
        if (birthdayImage) {
            // Establecer imagen por defecto si está vacía
            if (!birthdayImage.src || birthdayImage.src.trim() === '') {
                birthdayImage.src = 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=280&fit=crop&auto=format';
                birthdayImage.alt = 'Hermoso pastel de cumpleaños para Viviana';
            }
            
            birthdayImage.style.cursor = 'pointer';
            birthdayImage.addEventListener('click', handleImageClick);
            birthdayImage.addEventListener('mouseenter', handleImageHover);
            birthdayImage.addEventListener('mouseleave', handleImageLeave);
        }
    }
    
    // ===== INTERACCIONES =====
    
    function initializeInteractions() {
        // Efectos para items de la tarjeta
        cardItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => handleItemHover(item, index));
            item.addEventListener('mouseleave', () => handleItemLeave(item));
            item.addEventListener('click', () => handleItemClick(item, index));
        });
        
        // Efectos para la cita
        if (quote) {
            quote.addEventListener('click', handleQuoteClick);
            quote.addEventListener('mouseenter', handleQuoteHover);
            quote.style.cursor = 'pointer';
        }
        
        // Efectos del contenedor
        if (container) {
            container.addEventListener('mousemove', handleContainerMove);
            container.addEventListener('click', handleContainerClick);
        }
        
        // Enlace de regreso
        if (surpriseLink) {
            surpriseLink.addEventListener('mouseenter', handleLinkHover);
            surpriseLink.addEventListener('click', handleLinkClick);
        }
    }
    
    function handleImageClick(event) {
        createHeartExplosion(event.target);
        playImageAnimation();
        incrementInteraction();
        
        if (interactionCount === 3) {
            activateCelebrationMode();
        }
    }
    
    function handleImageHover() {
        birthdayImage.style.filter = 'brightness(1.15) saturate(1.3) drop-shadow(0 10px 20px rgba(255, 154, 158, 0.3))';
        birthdayImage.style.transform = 'scale(1.02) rotate(-1deg)';
    }
    
    function handleImageLeave() {
        birthdayImage.style.filter = '';
        birthdayImage.style.transform = '';
    }
    
    function handleItemHover(item, index) {
        item.style.transform = 'translateX(12px) scale(1.02)';
        item.style.textShadow = '0 3px 15px rgba(255, 154, 158, 0.4)';
        item.style.color = '#ff6b9d';
        
        createItemSparkles(item);
    }
    
    function handleItemLeave(item) {
        item.style.transform = 'translateX(0) scale(1)';
        item.style.textShadow = 'none';
        item.style.color = '';
    }
    
    function handleItemClick(item, index) {
        playItemAnimation(item);
        createFloatingHearts(item);
        incrementInteraction();
    }
    
    function handleQuoteClick() {
        quote.style.animation = 'quoteBounce 1.2s ease-in-out';
        createQuoteEffect();
        incrementInteraction();
    }
    
    function handleQuoteHover() {
        quote.style.transform = 'scale(1.02) rotate(0.5deg)';
    }
    
    function handleContainerMove(event) {
        if (!celebrationMode) return;
        
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        createMagicTrail(x, y);
    }
    
    function handleContainerClick() {
        createRippleEffect();
        incrementInteraction();
    }
    
    function handleLinkHover() {
        createLinkEffect();
    }
    
    function handleLinkClick(event) {
        event.preventDefault();
        
        container.style.animation = 'containerFadeOut 0.8s ease-in-out forwards';
        
        setTimeout(() => {
            window.location.href = surpriseLink.href;
        }, 800);
    }
    
    // ===== EFECTOS VISUALES =====
    
    function initializeVisualEffects() {
        startFloatingElements();
        initializeBackgroundAnimation();
    }
    
    function startVivianaExperience() {
        setTimeout(() => {
            document.body.classList.add('celebrate');
            createWelcomeEffect();
        }, 1000);
    }
    
    function createHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const vivianaColors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee', '#ffecd2', '#fcb69f'];
        const heartShapes = ['💖', '💕', '💗', '💓', '💝', '🌸'];
        
        for (let i = 0; i < 25; i++) {
            const heart = document.createElement('div');
            heart.textContent = heartShapes[Math.floor(Math.random() * heartShapes.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: ${1 + Math.random() * 0.8}rem;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(heart);
            animateHeartExplosion(heart, i);
        }
    }
    
    function animateHeartExplosion(heart, index) {
        const angle = (Math.PI * 2 * index) / 25;
        const velocity = 40 + Math.random() * 60;
        const gravity = 0.4;
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
            velocityX *= 0.99;
            velocityY *= 0.99;
            rotation += 5;
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
    
    function playImageAnimation() {
        birthdayImage.style.animation = 'imageJoyBounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            birthdayImage.style.animation = '';
        }, 1000);
    }
    
    function createItemSparkles(item) {
        const rect = item.getBoundingClientRect();
        
        for (let i = 0; i < 4; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.right + 5}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: 0.7rem;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }
    }
    
    function playItemAnimation(item) {
        item.style.animation = 'itemJump 0.8s ease-in-out';
        setTimeout(() => {
            item.style.animation = '';
        }, 800);
    }
    
    function createFloatingHearts(item) {
        const rect = item.getBoundingClientRect();
        const hearts = ['💖', '💕', '💗'];
        
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 1000;
                animation: heartRise 3s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }
    }
    
    function createQuoteEffect() {
        const rect = quote.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            star.textContent = '⭐';
            star.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.2rem;
                pointer-events: none;
                z-index: 1000;
                animation: starBurst 2.5s ease-out forwards;
            `;
            
            document.body.appendChild(star);
            animateStarBurst(star, i);
        }
    }
    
    function animateStarBurst(star, index) {
        const angle = (Math.PI * 2 * index) / 15;
        const distance = 100 + Math.random() * 50;
        const endX = parseFloat(star.style.left) + Math.cos(angle) * distance;
        const endY = parseFloat(star.style.top) + Math.sin(angle) * distance;
        
        setTimeout(() => {
            star.style.left = endX + 'px';
            star.style.top = endY + 'px';
            star.style.opacity = '0';
            star.style.transform = 'scale(2) rotate(360deg)';
        }, 100);
        
        setTimeout(() => star.remove(), 2500);
    }
    
    function createMagicTrail(x, y) {
        const trail = document.createElement('div');
        trail.textContent = '✨';
        trail.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: 0.8rem;
            pointer-events: none;
            z-index: 999;
            animation: trailFade 1.5s ease-out forwards;
        `;
        
        container.appendChild(trail);
        setTimeout(() => trail.remove(), 1500);
    }
    
    function createRippleEffect() {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 154, 158, 0.2);
            transform: translate(-50%, -50%);
            animation: rippleExpand 1s ease-out forwards;
            pointer-events: none;
            z-index: 0;
        `;
        
        container.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }
    
    function createLinkEffect() {
        const rect = surpriseLink.getBoundingClientRect();
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    font-size: 0.9rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: linkSparkle 2s ease-out forwards;
                `;
                
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 2000);
            }, i * 150);
        }
    }
    
    function startFloatingElements() {
        const vivianaElements = ['🌸', '💖', '🦋', '✨', '🌺', '💝'];
        
        function createFloatingElement() {
            const element = document.createElement('div');
            element.textContent = vivianaElements[Math.floor(Math.random() * vivianaElements.length)];
            element.style.cssText = `
                position: fixed;
                font-size: ${0.8 + Math.random() * 0.6}rem;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                z-index: 1;
                pointer-events: none;
                animation: elementFloat ${12 + Math.random() * 8}s linear infinite;
                opacity: ${0.4 + Math.random() * 0.4};
            `;
            
            document.body.appendChild(element);
            setTimeout(() => element.remove(), 20000);
        }
        
        setInterval(createFloatingElement, 2000);
        
        for (let i = 0; i < 3; i++) {
            setTimeout(createFloatingElement, i * 800);
        }
    }
    
    function initializeBackgroundAnimation() {
        setTimeout(() => {
            document.body.style.backgroundSize = '400% 400%';
            document.body.style.animation = 'backgroundShift 10s ease-in-out infinite';
        }, 3000);
    }
    
    function createWelcomeEffect() {
        const welcome = document.createElement('div');
        welcome.innerHTML = '¡Bienvenida Viviana! 💖';
        welcome.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2rem;
            font-weight: 700;
            color: #ff6b9d;
            z-index: 10000;
            pointer-events: none;
            text-shadow: 0 0 20px rgba(255, 154, 158, 0.6);
            animation: welcomeAppear 4s ease-in-out forwards;
        `;
        
        document.body.appendChild(welcome);
        setTimeout(() => welcome.remove(), 4000);
    }
    
    function activateCelebrationMode() {
        celebrationMode = true;
        
        const celebrationMsg = document.createElement('div');
        celebrationMsg.innerHTML = '¡Modo celebración activado! ✨';
        celebrationMsg.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff9a9e, #fad0c4);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(255, 154, 158, 0.4);
            animation: celebrationNotice 3s ease-in-out forwards;
        `;
        
        document.body.appendChild(celebrationMsg);
        setTimeout(() => celebrationMsg.remove(), 3000);
        
        // Crear efectos especiales continuos
        const celebrationInterval = setInterval(() => {
            if (celebrationMode) {
                createRandomCelebrationEffect();
            } else {
                clearInterval(celebrationInterval);
            }
        }, 1500);
    }
    
    function createRandomCelebrationEffect() {
        const effects = [
            () => createFloatingElement(),
            () => createHeartBurst(),
            () => createSparkleShower()
        ];
        
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
    }
    
    function createHeartBurst() {
        const hearts = ['💖', '💕', '💗', '💓'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    font-size: 1.5rem;
                    z-index: 1000;
                    pointer-events: none;
                    animation: heartBurstUp 4s ease-out forwards;
                `;
                
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 4000);
            }, i * 100);
        }
    }
    
    function createSparkleShower() {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: -20px;
                    font-size: 1rem;
                    z-index: 1000;
                    pointer-events: none;
                    animation: sparkleShower 3s linear forwards;
                `;
                
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 3000);
            }, i * 50);
        }
    }
    
    function incrementInteraction() {
        interactionCount++;
        
        if (interactionCount >= 10 && !celebrationMode) {
            activateCelebrationMode();
        }
    }
    
    // ===== ESTILOS DINÁMICOS =====
    
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes imageJoyBounce {
                0% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.15) rotate(-3deg); }
                50% { transform: scale(1.1) rotate(2deg); }
                75% { transform: scale(1.05) rotate(-1deg); }
                100% { transform: scale(1) rotate(0deg); }
            }
            
            @keyframes sparkleFloat {
                0% { opacity: 1; transform: translateY(0) scale(1); }
                100% { opacity: 0; transform: translateY(-40px) scale(1.5); }
            }
            
            @keyframes itemJump {
                0%, 100% { transform: translateX(0) scale(1); }
                50% { transform: translateX(15px) scale(1.08); }
            }
            
            @keyframes heartRise {
                0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
                100% { opacity: 0; transform: translateY(-100px) scale(1.5) rotate(180deg); }
            }
            
            @keyframes starBurst {
                0% { opacity: 1; transform: scale(1) rotate(0deg); }
                100% { opacity: 0; transform: scale(2) rotate(360deg); }
            }
            
            @keyframes trailFade {
                0% { opacity: 1; transform: scale(1) rotate(0deg); }
                100% { opacity: 0; transform: scale(2) rotate(180deg); }
            }
            
            @keyframes rippleExpand {
                0% { width: 0; height: 0; opacity: 0.8; }
                100% { width: 200px; height: 200px; opacity: 0; }
            }
            
            @keyframes linkSparkle {
                0% { opacity: 1; transform: scale(1) rotate(0deg); }
                100% { opacity: 0; transform: scale(1.8) rotate(360deg); }
            }
            
            @keyframes elementFloat {
                0% { transform: translateY(0) rotate(0deg); }
                100% { transform: translateY(-110vh) rotate(270deg); }
            }
            
            @keyframes backgroundShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            @keyframes welcomeAppear {
                0% { opacity: 0; transform: translateX(-50%) scale(0.5); }
                20% { opacity: 1; transform: translateX(-50%) scale(1.1); }
                30% { transform: translateX(-50%) scale(1); }
                90% { opacity: 1; transform: translateX(-50%) scale(1); }
                100% { opacity: 0; transform: translateX(-50%) scale(0.8); }
            }
            
            @keyframes celebrationNotice {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
            
            @keyframes heartBurstUp {
                0% { opacity: 0; transform: translateY(0) scale(0.5) rotate(0deg); }
                20% { opacity: 1; transform: translateY(-30px) scale(1) rotate(45deg); }
                100% { opacity: 0; transform: translateY(-120vh) scale(1.5) rotate(360deg); }
            }
            
            @keyframes sparkleShower {
                0% { opacity: 1; transform: translateY(0) rotate(0deg); }
                100% { opacity: 0; transform: translateY(100vh) rotate(360deg); }
            }
            
            @keyframes quoteBounce {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.05) rotate(1deg); }
                50% { transform: scale(1.1) rotate(0deg); }
                75% { transform: scale(1.05) rotate(-1deg); }
            }
            
            @keyframes containerFadeOut {
                0% { opacity: 1; transform: scale(1) rotate(0deg); }
                100% { opacity: 0; transform: scale(0.9) rotate(3deg) translateY(30px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar estilos
    addDynamicStyles();
    
    // ===== MANEJO DE VISIBILIDAD =====
    
    document.addEventListener('visibilitychange', function() {
        if (birthdayAudio && isAudioPlaying) {
            if (document.hidden) {
                birthdayAudio.pause();
            } else {
                birthdayAudio.play().catch(() => {
                    console.log('No se pudo reanudar música');
                });
            }
        }
    });
    
    // ===== FUNCIONES GLOBALES =====
    
    window.celebrateViviana = function() {
        console.log('Celebración especial para Viviana activada!');
        
        activateCelebrationMode();
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createHeartBurst();
            }, i * 200);
        }
        
        container.style.animation = 'vivianaSpecialCelebration 3s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
        }, 3000);
        
        const specialStyle = document.createElement('style');
        specialStyle.textContent = `
            @keyframes vivianaSpecialCelebration {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.03) rotate(1deg); }
                50% { transform: scale(1.06) rotate(0deg); }
                75% { transform: scale(1.03) rotate(-1deg); }
            }
        `;
        document.head.appendChild(specialStyle);
        
        setTimeout(() => specialStyle.remove(), 3000);
    };
    
    console.log('Página especial de Viviana cargada completamente!');
});