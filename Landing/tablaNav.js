document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const rutas = document.querySelectorAll('[id^=rutaContainer]');

    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();

        rutas.forEach(ruta => {
            const rutaText = ruta.querySelector('p').textContent.toLowerCase();
            if (rutaText.includes(searchText)) {
                ruta.style.display = 'flex';
            } else {
                ruta.style.display = 'none';
            }
        });
    });
});
