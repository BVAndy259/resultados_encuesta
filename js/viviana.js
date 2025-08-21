class VivianaPage {
    constructor() {
        this.achievementsUnlocked = new Set();
        this.badgeCount = 0;
        this.init();
    }

    init() {
        this.createFloatingStars();
        this.addSophisticatedInteractions();
        this.setupProgressiveReveal();
        
        // Crear estrellas continuamente
        setInterval(() => {
            this.createFloatingStars(4);
        }, 4000);
    }

    createFloatingStars(count = 10) {
        const container = document.getElementById('floatingStars');
        const stars = ['⭐', '✨', '💫', '🌟', '💜', '💎', '🔮', '⚡'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.className = 'star';
                star.textContent = stars[Math.floor(Math.random() * stars.length)];
                star.style.left = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (Math.random() * 8 + 8) + 's';
                
                container.appendChild(star);

                // Remover después de la animación
                setTimeout(() => {
                    star.remove();
                }, 18000);
            }, i * 300);
        }
    }

    addSophisticatedInteractions() {
        // Efectos elegantes para elementos interactivos
        document.querySelectorAll('.achievement-button, .nav-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.playSound('achievementSound', 0.08);
            });

            // Efecto de ondas al hacer click
            btn.addEventListener('click', (e) => {
                this.createRippleEffect(e.target, e);
            });
        });

        // Parallax suave para el scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.getElementById('floatingStars');
            const speed = scrolled * 0.2;
            parallax.style.transform = `translateY(${speed}px)`;
        });
    }

    setupProgressiveReveal() {
        // Revelación progresiva de elementos al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    
                    // Efecto especial para secciones importantes
                    if (entry.target.classList.contains('confident-glow')) {
                        setTimeout(() => {
                            this.createStarBurst(entry.target);
                        }, 800);
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    }

    createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        // Agregar animación CSS dinámicamente
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    createStarBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            star.textContent = '⭐';
            star.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.5rem;
                color: #9b59b6;
                pointer-events: none;
                z-index: 1000;
                animation: starBurst 1.5s ease-out forwards;
            `;

            // Dirección aleatoria para cada estrella
            const angle = (i * 45) * (Math.PI / 180);
            const distance = 100 + Math.random() * 50;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            star.style.setProperty('--endX', endX + 'px');
            star.style.setProperty('--endY', endY + 'px');

            document.body.appendChild(star);
            setTimeout(() => star.remove(), 1500);
        }

        // Agregar animación CSS para starBurst si no existe
        if (!document.getElementById('starburst-style')) {
            const style = document.createElement('style');
            style.id = 'starburst-style';
            style.textContent = `
                @keyframes starBurst {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1) rotate(360deg) translate(var(--endX), var(--endY));
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    addBadge(text, color = '#f39c12') {
        const badgesArea = document.getElementById('badgesArea');
        const badge = document.createElement('span');
        badge.className = 'achievement-badge';
        badge.textContent = text;
        badge.style.background = `linear-gradient(135deg, ${color}, #e67e22)`;
        badgesArea.appendChild(badge);
        
        this.badgeCount++;
        this.playSound('successSound', 0.15);
    }

    playSound(audioId, volume = 0.3) {
        try {
            const audio = document.getElementById(audioId);
            if (audio) {
                audio.volume = volume;
                audio.play().catch(e => console.log('Audio play failed:', e));
            }
        } catch (error) {
            console.log('Audio error:', error);
        }
    }
}

// Funciones globales para interactividad
function unlockAchievement(number) {
    const achievement = document.getElementById(`achievement${number}`);
    const viviana = new VivianaPage();
    
    if (viviana.achievementsUnlocked.has(number)) {
        achievement.classList.add('hidden');
        achievement.classList.remove('visible');
        viviana.achievementsUnlocked.delete(number);
    } else {
        achievement.classList.remove('hidden');
        achievement.classList.add('visible');
        viviana.achievementsUnlocked.add(number);
        viviana.playSound('achievementSound', 0.2);
        
        // Agregar badge de logro
        const badges = ['🎯 Logro Desbloqueado', '🌟 Estrella Conseguida', '💎 Diamante Obtenido'];
        const colors = ['#9b59b6', '#3498db', '#e74c3c'];
        viviana.addBadge(badges[number - 1], colors[number - 1]);
        
        // Crear efecto especial
        viviana.createStarBurst(achievement);
    }

    // Scroll suave hacia el logro
    setTimeout(() => {
        achievement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 300);
}

function createStarShower() {
    const viviana = new VivianaPage();
    viviana.createFloatingStars(30);
    viviana.playSound('successSound', 0.25);
    
    // Agregar badge especial
    viviana.addBadge('⭐ Lluvia de Estrellas Activada', '#1abc9c');
    
    // Vibración si está disponible
    if ('vibrate' in navigator) {
        navigator.vibrate([150, 100, 150, 100, 150]);
    }

    // Efecto de confetti de estrellas
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = '⭐';
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    font-size: 2rem;
                    color: #9b59b6;
                    animation: confettiFall 3s linear;
                    pointer-events: none;
                    z-index: 1000;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
    }, 500);

    // Agregar animación de confetti si no existe
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    new VivianaPage();
    
    // Mensaje de bienvenida en consola
    setTimeout(() => {
        console.log('💜 ¡Hola Viviana! Esta página fue diseñada especialmente para ti ⭐');
    }, 2000);
    
    // Easter egg: konami code
    let konamiCode = '';
    const konami = '38384040373937396665';
    document.addEventListener('keydown', (e) => {
        konamiCode += e.keyCode;
        if (konamiCode.length > konami.length) {
            konamiCode = konamiCode.substr(konamiCode.length - konami.length);
        }
        if (konamiCode === konami) {
            const viviana = new VivianaPage();
            viviana.addBadge('🎮 Código Secreto Descubierto', '#e74c3c');
            createStarShower();
        }
    });
});

// Permitir interacción con audio
document.addEventListener('click', () => {
    // Activar contexto de audio
}, { once: true });