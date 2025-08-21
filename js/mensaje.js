class TwinPage {
    constructor() {
        this.activePowers = new Set();
        this.celebrationCount = 0;
        this.init();
    }

    init() {
        this.createFloatingTwins();
        this.addTwinInteractions();
        this.setupTwinSync();
        
        // Crear elementos gemelos continuamente
        setInterval(() => {
            this.createFloatingTwins(6);
        }, 5000);
        
        // Efecto especial cada 30 segundos
        setInterval(() => {
            this.twinSyncMoment();
        }, 30000);
    }

    createFloatingTwins(count = 12) {
        const container = document.getElementById('floatingTwins');
        const dianaElements = ['🌸', '💕', '🎀', '🦄', '✨', '💖', '🌺'];
        const vivianaElements = ['⭐', '💜', '🔮', '💎', '🌟', '⚡', '💫'];
        const sharedElements = ['👭', '♊', '🎂', '🎉', '🎊', '💝', '🎈'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const element = document.createElement('div');
                element.className = 'twin-element';
                
                const randomType = Math.random();
                if (randomType < 0.35) {
                    // Diana elements
                    element.classList.add('diana-element');
                    element.textContent = dianaElements[Math.floor(Math.random() * dianaElements.length)];
                } else if (randomType < 0.7) {
                    // Viviana elements
                    element.classList.add('viviana-element');
                    element.textContent = vivianaElements[Math.floor(Math.random() * vivianaElements.length)];
                } else {
                    // Shared elements
                    element.classList.add('shared-element');
                    element.textContent = sharedElements[Math.floor(Math.random() * sharedElements.length)];
                }
                
                element.style.left = Math.random() * 100 + '%';
                element.style.animationDelay = Math.random() * 3 + 's';
                element.style.animationDuration = (Math.random() * 6 + 8) + 's';
                
                container.appendChild(element);

                // Remover después de la animación
                setTimeout(() => {
                    element.remove();
                }, 15000);
            }, i * 200);
        }
    }

    addTwinInteractions() {
        // Efectos especiales para botones
        document.querySelectorAll('.power-card, .nav-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.playSound('twinSound', 0.1);
                this.createMiniTwinEffect(btn);
            });

            // Efecto de doble click para gemelas
            let clickCount = 0;
            btn.addEventListener('click', (e) => {
                clickCount++;
                if (clickCount === 2) {
                    this.doubleClickEffect(e.target);
                    clickCount = 0;
                }
                setTimeout(() => { clickCount = 0; }, 500);
            });
        });

        // Sincronización de scroll
        this.addScrollSync();
    }

    createMiniTwinEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Crear par de elementos (para gemelas)
        for (let i = 0; i < 2; i++) {
            const twin = document.createElement('div');
            twin.textContent = i === 0 ? '🌸' : '💜';
            twin.style.cssText = `
                position: fixed;
                left: ${centerX + (i === 0 ? -20 : 20)}px;
                top: ${centerY}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 1000;
                animation: miniTwinFloat 2s ease-out forwards;
            `;

            document.body.appendChild(twin);
            setTimeout(() => twin.remove(), 2000);
        }

        // Agregar animación CSS si no existe
        if (!document.getElementById('mini-twin-style')) {
            const style = document.createElement('style');
            style.id = 'mini-twin-style';
            style.textContent = `
                @keyframes miniTwinFloat {
                    0% {
                        opacity: 1;
                        transform: scale(0.5) translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1) translateY(-50px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    doubleClickEffect(element) {
        // Efecto especial de doble click (conexión de gemelas)
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'twinBond 1s ease-in-out';
        
        this.playSound('twinSound', 0.3);
        this.createFloatingTwins(8);
    }

    setupTwinSync() {
        // Sincronización especial cada vez que se revela contenido
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('twin-section')) {
                    setTimeout(() => {
                        this.twinSyncMoment();
                    }, 1000);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.twin-section').forEach(section => {
            observer.observe(section);
        });
    }

    addScrollSync() {
        // Efecto de scroll sincronizado
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.createFloatingTwins(2);
            }, 150);
        });
    }

    twinSyncMoment() {
        // Momento especial de sincronización de gemelas
        const sections = document.querySelectorAll('.twin-bond');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.animation = 'none';
                section.offsetHeight;
                section.style.animation = 'twinBond 2s ease-in-out';
            }, index * 500);
        });

        this.createFloatingTwins(10);
        this.playSound('twinSound', 0.2);
    }

    activateTwinCelebration() {
        // Celebración masiva de gemelas
        this.celebrationCount++;
        
        // Crear lluvia doble (rosa y morado)
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = i % 2 === 0 ? '🌸' : '💜';
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    font-size: 2rem;
                    animation: twinConfetti ${3 + Math.random() * 2}s linear;
                    pointer-events: none;
                    z-index: 1000;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }, i * 50);
        }

        // Efecto especial si es la primera vez
        if (this.celebrationCount === 1) {
            this.firstTwinCelebration();
        }

        // Sonidos especiales
        this.playSound('celebrationSound', 0.4);
        setTimeout(() => this.playSound('twinSound', 0.3), 1000);
    }

    firstTwinCelebration() {
        // Efecto especial solo la primera vez
        document.body.style.animation = 'geminiGradient 2s ease-in-out';
        
        // Mensaje especial temporal
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff9ec7, #9b59b6);
                color: white;
                padding: 2rem;
                border-radius: 20px;
                font-size: 1.5rem;
                font-weight: bold;
                text-align: center;
                z-index: 2000;
                animation: specialMessage 4s ease-in-out forwards;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            ">
                ✨ ¡PODER DE GEMELAS ACTIVADO! ✨<br>
                <small style="font-size: 1rem; opacity: 0.9;">Diana & Viviana conectadas 👭</small>
            </div>
        `;
        
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 4000);

        // Agregar animación si no existe
        if (!document.getElementById('special-message-style')) {
            const style = document.createElement('style');
            style.id = 'special-message-style';
            style.textContent = `
                @keyframes specialMessage {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.5);
                    }
                    20%, 80% {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                }
                @keyframes twinConfetti {
                    0% {
                        opacity: 1;
                        transform: translateY(-100vh) rotate(0deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(100vh) rotate(720deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
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
function activateTwinPower(number) {
    const power = document.getElementById(`twinPower${number}`);
    const twinPage = new TwinPage();
    
    if (twinPage.activePowers.has(number)) {
        power.classList.add('hidden');
        power.classList.remove('visible');
        twinPage.activePowers.delete(number);
    } else {
        power.classList.remove('hidden');
        power.classList.add('visible');
        twinPage.activePowers.add(number);
        twinPage.playSound('twinSound', 0.25);
        
        // Efectos especiales por poder
        if (number === 1) {
            // Conexión mental - crear elementos sincronizados
            twinPage.createFloatingTwins(12);
        } else if (number === 2) {
            // Energía dual - duplicar efectos
            twinPage.twinSyncMoment();
        } else if (number === 3) {
            // Sincronización - todas las secciones se animan
            document.querySelectorAll('.twin-section').forEach((section, i) => {
                setTimeout(() => {
                    section.style.animation = 'none';
                    section.offsetHeight;
                    section.style.animation = 'dualSlide 1s ease-out';
                }, i * 200);
            });
        }
    }

    // Scroll hacia el poder activado
    setTimeout(() => {
        power.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 400);
}

function createTwinCelebration() {
    const twinPage = new TwinPage();
    twinPage.activateTwinCelebration();
    
    // Vibración especial de gemelas
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200, 100, 200]);
    }
}

// Inicializar cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    new TwinPage();
    
    // Mensaje especial en consola
    setTimeout(() => {
        console.log('👭 ¡Hola Diana y Viviana! Esta página celebra su conexión especial de gemelas 🌸💜');
    }, 2500);
    
    // Easter egg: presionar G+E+M+E+L+A+S
    let twinCode = '';
    const gemelas = 'GEMELAS';
    let gemelasIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toUpperCase() === gemelas[gemelasIndex]) {
            gemelasIndex++;
            if (gemelasIndex === gemelas.length) {
                // Código secreto completado
                const twinPage = new TwinPage();
                twinPage.firstTwinCelebration();
                createTwinCelebration();
                gemelasIndex = 0;
            }
        } else {
            gemelasIndex = 0;
        }
    });

    // Auto-sincronización cada minuto
    setInterval(() => {
        const twinPage = new TwinPage();
        twinPage.twinSyncMoment();
    }, 60000);
});

// Permitir interacción con audio
document.addEventListener('click', () => {
    // Activar contexto de audio
}, { once: true });