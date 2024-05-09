document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")
    
    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)
    document.getElementById("btn_move").addEventListener("click", move)
    document.getElementById("btn_stop").addEventListener("click", stop)
    document.getElementById("btn_to_point").addEventListener("click", topoint)
    document.getElementById("btn_change_direction").addEventListener("click", changeDirection)

    data = {
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
        }
    }

    function connect(){
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

    function disconnect(){
        data.ros.close()        
        data.connected = false
        console.log('Clic en botón de desconexión')
    }   
    
    function move() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })

        let linearVelocity = 0.1; // Default linear velocity
        let angularVelocity = -0.2; // Default angular velocity

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

    function topoint() {
        if (!data.connected) {
            console.log("No estás conectado a ROS");
            return;
        }
    
        // Crear el tópico para enviar el punto objetivo
        let goalTopic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/goal_pose',
            messageType: 'geometry_msgs/msg/PoseStamped'
        });
    
        // Coordenadas de destino (puedes cambiar estos valores)
        let destination = {
            x: 1.0, // Coordenada x del objetivo
            y: 1.0, // Coordenada y del objetivo
            z: 0.0  // Coordenada z (casi siempre 0 para navegación 2D)
        };
    
        // Crear el mensaje de objetivo
        let goalMessage = new ROSLIB.Message({
            header: {
                seq: 0,
                stamp: { secs: 0, nsecs: 0 },
                frame_id: 'map' // El marco de referencia, a menudo 'map'
            },
            pose: {
                position: {
                    x: destination.x,
                    y: destination.y,
                    z: destination.z
                },
                orientation: {
                    x: 0,
                    y: 0,
                    z: 0,
                    w: 1 // Esto puede variar según tu configuración de orientación
                }
            }
        });
    
        // Publicar el mensaje al tópico de objetivos
        goalTopic.publish(goalMessage);
    
        console.log(`Robot moviéndose al punto (x: ${destination.x}, y: ${destination.y})`);
    }    

    function stop() {
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
    }

    function changeDirection() {
        // Toggle between forward and backward directions
        if (data.direction === 'forward') {
            data.direction = 'backward';
            console.log('Direction changed to backward');
        } else {
            data.direction = 'forward';
            console.log('Direction changed to forward');
        }
    }
});