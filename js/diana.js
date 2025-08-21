class DianaPage {
    constructor() {
        this.surprisesShown = new Set();
        this.init();
    }

    init() {
        this.createFloatingHearts();
        this.addSmoothScrolling();
        this.addGentleInteractions();
        
        // Crear corazones continuamente
        setInterval(() => {
            this.createFloatingHearts(3);
        }, 3000);
    }

    createFloatingHearts(count = 8) {
        const container = document.getElementById('floatingHearts');
        const hearts = ['💕', '💖', '💗', '💝', '🌸', '✨', '💫', '🌺'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 2 + 's';
                
                container.appendChild(heart);

                // Remover después de la animación
                setTimeout(() => {
                    heart.remove();
                }, 10000);
            }, i * 200);
        }
    }

    addSmoothScrolling() {
        // Scroll suave para la personalidad tímida de Diana
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    addGentleInteractions() {
        // Efectos suaves para elementos interactivos
        document.querySelectorAll('.fun-button, .nav-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.playSound('clickSound', 0.1);
            });
        });

        // Efecto de entrada suave para secciones
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        });

        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
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
function showSurprise(number) {
    const surprise = document.getElementById(`surprise${number}`);
    const diana = new DianaPage();
    
    if (diana.surprisesShown.has(number)) {
        surprise.classList.add('hidden');
        diana.surprisesShown.delete(number);
    } else {
        surprise.classList.remove('hidden');
        surprise.classList.add('visible');
        diana.surprisesShown.add(number);
        diana.playSound('clickSound', 0.2);
        
        // Crear corazones especiales al mostrar sorpresa
        diana.createFloatingHearts(15);
    }

    // Scroll suave hacia la sorpresa
    setTimeout(() => {
        surprise.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 300);
}

function createMoreHearts() {
    const diana = new DianaPage();
    diana.createFloatingHearts(25);
    diana.playSound('clickSound', 0.3);
    
    // Vibración suave si está disponible
    if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
    }
}

// Inicializar cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    new DianaPage();
    
    // Mensaje de bienvenida discreto
    setTimeout(() => {
        console.log('💕 ¡Hola Diana! Esta página fue hecha especialmente para ti 🌸');
    }, 2000);
});

// Permitir interacción con audio
document.addEventListener('click', () => {
    // Activar contexto de audio
}, { once: true });