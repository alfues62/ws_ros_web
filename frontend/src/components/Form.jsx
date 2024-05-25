import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="left-half">
                <div className="login-container">
                    <h2 className="login-title">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(26, 65, 165, 1)' }}> {/* Aplicamos el color de fondo */}
                    <label htmlFor="usuario" className="label-usuario">Usuario</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa tu usuario"
                    />
                    <label htmlFor="contraseña" className="label-contraseña">Contraseña</label>
                    <input
                        type="password"
                        id="contraseña"
                        name="contraseña"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                    />
                    {loading && <LoadingIndicator />}
                    <button type="submit" className="button_comenzar">{name}</button> {/* Aplicamos la clase button_comenzar */}
                </form>
                </div>
            </div>

            <aside className="sidebar">
                <img src="/Cosas/Logo.png" alt="Logo" className="imagen_logo" />
                <img src="/Cosas/perfilVacio.png" alt="Perfil Vacío" className="imagen_perfil_vacio" />
            </aside>
            
            <div className="header">
                <div className="title-container">
                    <h1>AGRO <br /> MATE</h1>
                </div>
            </div>

            <div class="main-content">
                <img src="/Cosas/tortugui.png" alt="Tortugui" class="tortugui-image"/>
            </div>
        </div>
    );
}

export default Form;