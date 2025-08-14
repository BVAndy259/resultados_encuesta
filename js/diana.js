document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('birthday-audio');
    if (audio) {
        audio.play().catch(e => console.log("Audio playback failed:", e));
    }

    setTimeout(() => {
        document.body.classList.add('celebrate');
    }, 1000);
});