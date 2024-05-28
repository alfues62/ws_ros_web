window.addEventListener("DOMContentLoaded", function() {
    var btn1 = document.getElementById('ManualBtn');
    var btn2 = document.getElementById('SeleccionarBtn');
    var divSwap1 = document.getElementById('MainDiv');
    var divSwap2 = document.getElementById('MainDiv2');

    btn2.style.backgroundColor = '#1A41A5';
    divSwap2.style.display = 'none';
    divSwap1.style.display = 'block';

    

    btn1.addEventListener('click', function() {
        controlManual();
        colorButton(); // Llamada después de cambiar el estado
    });

    btn2.addEventListener('click', function() {
        controlSeleccion();
        colorButton(); // Llamada después de cambiar el estado
    });
}, false);

function controlManual() {
    var divSwap1 = document.getElementById('MainDiv');
    var divSwap2 = document.getElementById('MainDiv2');

    divSwap1.style.display = 'none';
    divSwap2.style.display = 'block';
}

function controlSeleccion() {
    var divSwap1 = document.getElementById('MainDiv');
    var divSwap2 = document.getElementById('MainDiv2');

    divSwap2.style.display = 'none';
    divSwap1.style.display = 'block';
}

function colorButton() {
    var divSwap1 = document.getElementById('MainDiv');
    var divSwap2 = document.getElementById('MainDiv2');
    var btn1 = document.getElementById('ManualBtn');
    var btn2 = document.getElementById('SeleccionarBtn');

    if (divSwap2.style.display === 'block') {
        btn1.style.backgroundColor = '#1A41A5'; // Cambiar a azul #1A41A5
        btn2.style.backgroundColor = ''; // Restablecer el color del botón 2
    } else {
        btn1.style.backgroundColor = ''; // Restablecer el color del botón 1
        btn2.style.backgroundColor = '#1A41A5'; // Cambiar a azul #1A41A5
    }
}
