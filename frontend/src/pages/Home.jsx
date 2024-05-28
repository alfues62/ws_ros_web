import React, { useState, useEffect } from "react";

function Home() {

    const redirigir = () => {
        window.location.href = '/NavigationLOLA/Navegacion.html';
    }
    
    const [data, setData] = useState({
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        // flag to track current direction
        direction: 'forward', // 'forward' or 'backward'

        // variable to store position data
        position: {
            x: 0,
            y: 0
        },
        // service information 
        service_busy: false,
        service_response: ''
    });

    useEffect(() => {
        // Load ROSLIB dynamically
        const script = document.createElement("script");
        script.src = "/roslib.min.js";
        script.async = true;
        script.onload = () => {
            // ROSLIB is now loaded
            console.log("ROSLIB loaded");
        };
        document.body.appendChild(script);

        // Cleanup function to remove the script element
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        document.getElementById("btn_con").addEventListener("click", connect);
        document.getElementById("btn_dis").addEventListener("click", disconnect);
        document.getElementById("btn_move").addEventListener("click", move);
        document.getElementById("btn_stop").addEventListener("click", stop);
        document.getElementById("btn_to_point").addEventListener("click", () => {
            const x = parseFloat(document.getElementById("x_value").value);
            const y = parseFloat(document.getElementById("y_value").value);
            call_point_service(x, y);
        });
        document.getElementById("btn_change_direction").addEventListener("click", changeDirection);

        // Cleanup function to remove event listeners
        return () => {
            document.getElementById("btn_con").removeEventListener("click", connect);
            document.getElementById("btn_dis").removeEventListener("click", disconnect);
            document.getElementById("btn_move").removeEventListener("click", move);
            document.getElementById("btn_stop").removeEventListener("click", stop);
            document.getElementById("btn_to_point").removeEventListener("click", () => {});
            document.getElementById("btn_change_direction").removeEventListener("click", changeDirection);
        };
    }, []);

    const connect = () => {
        console.log("Clic en connect")

        data.ros = new ROSLIB.Ros({
            url: data.rosbridge_address
        })

        // Define callbacks
        data.ros.on("connection", () => {
            data.connected = true
            console.log("Conexion con ROSBridge correcta")
        })
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on("close", () => {
            data.connected = false
            console.log("Conexion con ROSBridge cerrada")            
        })

        // Subscribe to topic /odom
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/odom',
            messageType: 'nav_msgs/msg/Odometry'
        })

        topic.subscribe((message) => {
            data.position = message.pose.pose.position
            document.getElementById("pos_x").innerHTML = data.position.x.toFixed(2)
            document.getElementById("pos_y").innerHTML = data.position.y.toFixed(2)
        })
    }
    
    const disconnect = () => {
        if (!data.ros) {
            console.error("ROS no está inicializado");
            return;
        }

        data.ros.close()        
        data.connected = false
        console.log('Clic en botón de desconexión')
    }
    
    const move = () => {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })

        let linearVelocity = 0.1; // Default linear velocity
        let angularVelocity = 0; // Default angular velocity

        if (data.direction === 'backward') {
            // If the direction is backward, reverse the linear velocity
            linearVelocity = -0.1;
        }

        let message = new ROSLIB.Message({
            linear: {x: linearVelocity, y: 0, z: 0 },
            angular: {x: 0, y: 0, z: angularVelocity },
        })
        topic.publish(message)
    }

    const stop = () => {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })

        // Sending zero velocities to stop the robot
        let message = new ROSLIB.Message({
            linear: {x: 0, y: 0, z: 0 },
            angular: {x: 0, y: 0, z: 0 },
        })
        topic.publish(message)
    };

    const changeDirection = () => {
        // Toggle between forward and backward directions
        if (data.direction === 'forward') {
            data.direction = 'backward';
            console.log('Direction changed to backward');
        } else {
            data.direction = 'forward';
            console.log('Direction changed to forward');
        }
    };

    const call_point_service = (x, y) => {
        if (!data.connected) {
            console.error("No hay conexión con ROS");
            return;
        }
    
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/point_server',  // Verifica el nombre del servicio
            serviceType: 'agro_mate_interface/srv/MyPointMsg'
        })
    
        let request = new ROSLIB.ServiceRequest({
            x: x,
            y: y,
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })
    };

    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="jumbotron text-center">
                        <h1>Hello ROS</h1>
                        <p>Let's connect our website to ROS</p>
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="text-center">Menu</h3>
                                    <p>This is the left side of my web page</p>
                                    <hr />
                                    <br />
                                    <button className="mt-2 btn btn-success" id="btn_con">Conectar</button>
                                    <button className="mt-2 btn btn-danger" id="btn_dis">Desconectar</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="text-center" id="menu4">Main content</h2>
                                    <p>Here it goes the main content of my web page.</p>
                                    <button className="mt-2 btn btn-primary" id="btn_move">Mover</button>
                                    <button className="mt-2 btn btn-primary" id="btn_stop">Parar</button>
                                    <button className="mt-2 btn btn-primary" id="btn_change_direction">Cambiar Direccion</button>
                                    <button className="mt-2 btn btn-primary" id="btn_to_point">Ir al Punto</button>
                                    <button onClick={redirigir}>Ir a la página HTML</button>
                                    <div className="mb-3">
                                        <label htmlFor="x_value" className="form-label">X Value:</label>
                                        <input type="number" className="form-control" id="x_value" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="y_value" className="form-label">Y Value:</label>
                                        <input type="number" className="form-control" id="y_value" />
                                    </div>
                                    <hr />
                                    <p>Subscribing robot data</p>
                                    <p>
                                        <span>X: <span id="pos_x"></span></span>
                                        <br />
                                        <span>Y: <span id="pos_y"></span></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer mt-auto bg-dark text-light">
                <div className="container">
                    <h5>page ends here!</h5>
                </div>
            </footer>
        </div>
    );
}

export default Home;