document.addEventListener('DOMContentLoaded', () => {
    const linkViviana = document.getElementById('linkViviana');
    const linkDiana = document.getElementById('linkDiana');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const messageLink = hiddenMessage.querySelector('a');

    const showMessageLink = () => {
        hiddenMessage.classList.add('visible');
        localStorage.setItem('mensajeRevelado', 'true');
    };

    if (localStorage.getItem('mensajeRevelado') === 'true') {
        hiddenMessage.classList.add('visible');
    }
    linkViviana.addEventListener('click', showMessageLink);
    linkDiana.addEventListener('click', showMessageLink);

    hiddenMessage.addEventListener('click', (e) => {
        if (!hiddenMessage.classList.contains('visible')) {
            e.preventDefault();
        }
    });
});
