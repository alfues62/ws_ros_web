import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

// Define el componente de la página de Landing
function Landing() {
  return (
    <div>
        <aside class="sidebar">
            <img src="/Cosas/Logo.png" alt="Logo" class="imagen_logo"/>
            <img src="/Cosas/perfilVacio.png" alt="Perfil Vacío" class="imagen_perfil_vacio"/>
        </aside>

        <div class="content">
            <h1>AGRO MATE</h1>
            <h2>ROBOTIZA TUS CAMPOS</h2>
            <h3>Monitoreo inteligente, cosechas exitosas:</h3>
            <h4>El futuro de la agricultura está en</h4>
            <h5>AgroMate</h5>
            <div className="button_ini">
                <Link to="/login">COMENZAR</Link>
            </div>
        </div>

        <img src="/Cosas/tortugui.png" alt="Tortugui" class="tortugui-image"/>
    </div>
  );
}

export default Landing;