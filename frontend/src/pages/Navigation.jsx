import React, { useState, useEffect } from "react";
import "../styles/Navegacion.css";
import "../styles/tabla.css";
import "../styles/tablaNav.css";

function Navigation() {
    useEffect(() => {
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
    }, []);

    const controlManual = () => {
        var divSwap1 = document.getElementById('MainDiv');
        var divSwap2 = document.getElementById('MainDiv2');

        divSwap1.style.display = 'none';
        divSwap2.style.display = 'block';
    }

    const controlSeleccion = () => {
        var divSwap1 = document.getElementById('MainDiv');
        var divSwap2 = document.getElementById('MainDiv2');

        divSwap2.style.display = 'none';
        divSwap1.style.display = 'block';
    }

    const colorButton = () => {
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

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        var button_nav = document.getElementById('button_com');
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
    }, []);

    const ponerTabNav = () => {
        var TablaGrabar = document.getElementById('Tabla');
        var TablaNav = document.getElementById('Tabla2');
        TablaGrabar.style.display = 'none';
        TablaNav.style.display = 'block';
    }

    const ponerTabGrabar = () => {
        var TablaGrabar = document.getElementById('Tabla');
        var TablaNav = document.getElementById('Tabla2');
        TablaGrabar.style.display = 'block';
        TablaNav.style.display = 'none';
    }

    return (
        <div>
            <div className="top-bar"></div>
            <div className="background-container">
                <img src="Cosas/Fondo_Navegacion.png" alt="Fondo de navegación" className="background-img"/>
            </div>
            <aside className="sidebar">
                <img src="Cosas/Logo.png" alt="Logo" className="imagen_logo"/>
                <img src="Cosas/estadistica.png" alt="Logo" className="estadistica_imagen"/>
                <img src="Cosas/flechita.png" alt="Logo" className="flechita_imagen"/>
                <img src="Cosas/perfilVacio.png" alt="Perfil Vacío" className="imagen_perfil_vacio"/>
            </aside>
            <div className="content">
                <div id="button_com" className="button_com">
                    <a href="javascript:void(0);">NAVEGACION</a>
                </div>
                <div id="button_grabar" className="button_grabar">
                    <a href="javascript:void(0);">GRABAR</a>
                </div>
            </div>
            <div className="bottom-bar"></div> 
            
            <section id="Tabla">
                <div id="TituloContainer"> 
                    <h1 id="Titulo">GRABAR RUTA</h1>
                </div>
                <div id="ButtonContainer">
                    <button id="ManualBtn">Manual</button>
                    <button id="SeleccionarBtn">Seleccionar puntos</button>
                </div>
                <div id="MainDiv" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '330px' }}>
                    <p id="Subtitulo">Seleccione los puntos en el campo por los que se quiere mover y dale a <span className="grabar-azul">grabar</span></p>
                    <p className="clasePuntos">Punto 1</p>
                    <p className="clasePuntos">Punto 2</p>
                    <p className="clasePuntos">Punto 3</p>
                </div>
                <div id="MainDiv2">
                    <p id="Subtitulo2">Dale a <span className="grabar-azul">grabar</span> y muévase por el mapa para guardar la ruta deseada.</p>
                    <img src="Cosas/moveImage.png" id="moveImage"/>
                </div>
                <div id="MainDiv3">
                    <button id="BotonGrabar"></button>
                </div>
                </section>
                <section id="Tabla2" style={{ display: 'none' }}>
            <h1 id="Titulo">MIS RUTAS</h1>
            <div id="searchContainer">
                <input type="text" id="searchInput" placeholder="Buscar"/>
            </div>
            <div id="rutaContainer1">
                <p id="r1">Primera ruta</p>
                <img src="Cosas/playButton.png" id="playButton1"/>
                <img src="Cosas/borrar.png" id="borrarButton1"/>
            </div>
            <div id="rutaContainer2">
                <p id="r2">Segunda ruta</p>
                <img src="Cosas/playButton.png" id="playButton2"/>
                <img src="Cosas/borrar.png" id="borrarButton2"/>
            </div>
            </section>
        </div>
    );
}

export default Navigation;


