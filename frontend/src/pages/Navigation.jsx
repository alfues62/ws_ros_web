import React, { useState, useEffect } from "react";
import styles from "../styles/Navegacion.module.css"; // Importar estilos del módulo
import tablaStyles from "../styles/tabla.module.css"; // Importar estilos del módulo de la tabla
import tablaNavStyles from "../styles/tablaNav.module.css"; // Importar estilos del módulo de la tabla de navegación

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
            <div className={styles["top-bar"]}></div>
            <div className={styles["background-container"]}>
                <img src="/Cosas/Fondo_Navegacion.png" alt="Fondo de navegación" className={styles["background-img"]}/>
            </div>
            <aside className={styles["sidebar"]}>
                <img src="/Cosas/Logo.png" alt="Logo" className={styles["imagen_logo"]}/>
                <img src="/Cosas/estadistica.png" alt="Logo" className={styles["estadistica_imagen"]}/>
                <img src="/Cosas/flechita.png" alt="Logo" className={styles["flechita_imagen"]}/>
                <img src="/Cosas/perfilVacio.png" alt="Perfil Vacío" className={styles["imagen_perfil_vacio"]}/>
            </aside>
            <div className={styles["content"]}>
                <div className={styles["button_com"]} id="button_com" >
                    <a href="javascript:void(0);">NAVEGACION</a>
                </div>
                <div className={styles["button_grabar"]} id="button_grabar" >
                    <a href="javascript:void(0);">GRABAR</a>
                </div>
            </div>
            <div className={styles["bottom-bar"]}></div> 
            
            <section className={tablaStyles["Tabla"]} id="Tabla" >
                <div className={tablaStyles["TituloContainer"]} id="TituloContainer"> 
                    <h1 className={tablaStyles["Titulo"]} id="Titulo">GRABAR RUTA</h1>
                </div>
                <div className={tablaStyles["ButtonContainer"]} >
                    <button className={tablaStyles["ManualBtn"]} id="ManualBtn" >Manual</button>
                    <button className={tablaStyles["SeleccionarBtn"]} id="SeleccionarBtn">Seleccionar puntos</button>
                </div>
                <div className={tablaStyles["MainDiv"]} id="MainDiv">
                    <p className={tablaStyles["Subtitulo"]} id="Subtitulo">Seleccione los puntos en el campo por los que se quiere mover y dale a <span className={styles["grabar-azul"]}>grabar</span></p>
                    <p className={tablaStyles["clasePuntos"]}>Punto 1</p>
                    <p className={tablaStyles["clasePuntos"]}>Punto 2</p>
                    <p className={tablaStyles["clasePuntos"]}>Punto 3</p>
                </div>
                <div className={tablaStyles["MainDiv2"]} id="MainDiv2">
                    <p  className={tablaStyles["Subtitulo2"]} id="Subtitulo2">Dale a <span className={tablaStyles["grabar-azul"]}>grabar</span> y muévase por el mapa para guardar la ruta deseada.</p>
                    <img src="/Cosas/moveImage.png" className={tablaStyles["moveImage"]} id="moveImage" alt="Mover imagen" />
                </div>
                <hr />
                <button className={tablaStyles["BotonGrabar"]} id="BotonGrabar"></button>
            </section>

            <section id="Tabla2" className={tablaNavStyles["Tabla2"]}>
                <div id={tablaNavStyles["TituloContainer"]}>
                    <h1 id={tablaNavStyles["Titulo"]}>NUEVA RUTA</h1>
                    <div id={tablaNavStyles["searchContainer"]}>
                        <input type="text" id="searchInput" className={tablaNavStyles["searchInput"]} placeholder="Buscar ruta..." />
                    </div>
                </div>
                <div id="rutaContainer1" className={tablaNavStyles["rutaContainer1"]}>
                    <p id="r1" className={tablaNavStyles["r1"]}>Ruta 1</p>
                    <button id="playButton1" className={tablaNavStyles["playButton1"]}></button>
                    <button  id="borrarButton1" className={tablaNavStyles["borrarButton1"]}></button>
                </div>
                <div id="rutaContainer2" className={tablaNavStyles["rutaContainer2"]}>
                    <p id="r2" className={tablaNavStyles["r2"]}>Ruta 2</p>
                    <button id="playButton2" className={tablaNavStyles["playButton2"]}></button>
                    <button id="borrarButton2" className={tablaNavStyles["borrarButton2"]}></button>
                </div>
            </section>
        </div>
    );
}

export default Navigation;