class BirthdaySurprise {
    constructor() {
        this.currentPhase = 'loading';
        this.progress = 0;
        this.loadingTexts = [
            'Inicializando sistema de análisis...',
            'Conectando con base de datos...',
            'Procesando respuestas del formulario...',
            'Analizando patrones de comportamiento...',
            'Generando insights personalizados...',
            'Calculando métricas avanzadas...',
            'Validando integridad de datos...',
            'Compilando resultados finales...',
            'Preparando visualizaciones...',
            'Finalizando análisis completo...'
        ];
        this.currentTextIndex = 0;
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.startLoadingSequence();
        this.updateProgress();
        this.updateStats();
    }

    startLoadingSequence() {
        // Cambiar texto cada 800ms
        setInterval(() => {
            if (this.currentPhase === 'loading') {
                this.updateLoadingText();
            }
        }, 800);

        // Completar carga después de 6 segundos
        setTimeout(() => {
            this.revealSurprise();
        }, 6000);
    }

    updateLoadingText() {
        const textElement = document.getElementById('loadingText');
        if (this.currentTextIndex < this.loadingTexts.length) {
            textElement.textContent = this.loadingTexts[this.currentTextIndex];
            this.currentTextIndex++;
            
            // Sonido de beep suave
            this.playSound('loadingSound', 0.1);
        }
    }

    updateProgress() {
        const progressInterval = setInterval(() => {
            if (this.currentPhase === 'loading' && this.progress < 100) {
                // Progreso realista con pausas y aceleraciones
                if (this.progress < 20) {
                    this.progress += Math.random() * 3 + 1;
                } else if (this.progress < 60) {
                    this.progress += Math.random() * 5 + 2;
                } else if (this.progress < 90) {
                    this.progress += Math.random() * 2 + 1;
                } else {
                    this.progress += Math.random() * 1 + 0.5;
                }

                if (this.progress > 100) this.progress = 100;

                const progressFill = document.getElementById('progressFill');
                progressFill.style.width = `${this.progress}%`;
            } else {
                clearInterval(progressInterval);
            }
        }, 100);
    }

    updateStats() {
        const statsInterval = setInterval(() => {
            if (this.currentPhase === 'loading') {
                // Actualizar estadísticas fake
                const responses = Math.floor(Math.random() * 50) + 1;
                const dataPoints = Math.floor(Math.random() * 500) + 100;
                const accuracy = Math.min(Math.floor(Math.random() * 30) + 70, 99);
                const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);

                document.getElementById('responsesProcessed').textContent = responses;
                document.getElementById('dataPoints').textContent = dataPoints;
                document.getElementById('accuracy').textContent = `${accuracy}%`;
                document.getElementById('timeElapsed').textContent = `${timeElapsed}s`;
            } else {
                clearInterval(statsInterval);
            }
        }, 500);
    }

    revealSurprise() {
        this.currentPhase = 'surprise';
        
        // Ocultar loading
        const loadingContainer = document.getElementById('loadingContainer');
        loadingContainer.classList.add('hidden');

        // Mostrar sorpresa después de la transición
        setTimeout(() => {
            const surpriseContainer = document.getElementById('surpriseContainer');
            surpriseContainer.classList.add('show');
            
            // Reproducir música de cumpleaños
            this.playSound('surpriseMusic', 0.3);
            
            // Crear confetti
            this.createConfetti();
            
            // Vibración si está disponible
            if ('vibrate' in navigator) {
                navigator.vibrate([200, 100, 200, 100, 200]);
            }
        }, 1000);
    }

    playSound(audioId, volume = 0.5) {
        try {
            const audio = document.getElementById(audioId);
            if (audio) {
                audio.volume = volume;
                audio.play().catch(e => {
                    console.log('Audio play failed:', e);
                });
            }
        } catch (error) {
            console.log('Audio error:', error);
        }
    }

    createConfetti() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                document.body.appendChild(confetti);

                // Remover confetti después de la animación
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 50);
        }
    }
}

// Inicializar cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si viene con parámetro direct=true
    const urlParams = new URLSearchParams(window.location.search);
    const isDirect = urlParams.get('direct') === 'true';
    
    if (isDirect) {
        // Ir directo a la sorpresa, saltarse la carga
        skipToSurprise();
    } else {
        // Mostrar simulación completa (primera visita)
        new BirthdaySurprise();
    }
});

// Función para ir directo a la sorpresa
function skipToSurprise() {
    // Ocultar loading inmediatamente
    const loadingContainer = document.getElementById('loadingContainer');
    loadingContainer.style.display = 'none';
    
    // Mostrar sorpresa directamente
    const surpriseContainer = document.getElementById('surpriseContainer');
    surpriseContainer.classList.add('show');
    
    // Reproducir música de fondo
    const birthday = new BirthdaySurprise();
    birthday.playSound('surpriseMusic', 0.3);
    
    // Crear confetti inmediatamente
    birthday.createConfetti();
    
    // Vibración si está disponible
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }
}

// Permitir interacción con audio después del primer click
document.addEventListener('click', () => {
    // Esto permite que los navegadores reproduzcan audio
}, { once: true });