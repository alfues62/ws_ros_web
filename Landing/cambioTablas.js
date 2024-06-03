window.addEventListener("DOMContentLoaded", function() {
    var button_nav = document.getElementById('button_comenzar');
    var button_grabar = document.getElementById('button_grabar');
    var TablaGrabar = document.getElementById('Tabla');
    var TablaNav = document.getElementById('Tabla2');

    TablaNav.style.display = 'none';

    button_nav.addEventListener('click', function() {
        ponerTabNav();
    });

    button_grabar.addEventListener('click', function() {
        ponerTabGrabar();
    });
}, false);

function ponerTabNav(){
    var TablaGrabar = document.getElementById('Tabla');
    var TablaNav = document.getElementById('Tabla2');
    TablaGrabar.style.display = 'none';
    TablaNav.style.display = 'block';
}

function ponerTabGrabar(){
    var TablaGrabar = document.getElementById('Tabla');
    var TablaNav = document.getElementById('Tabla2');
    TablaGrabar.style.display = 'block';
    TablaNav.style.display = 'none';
}