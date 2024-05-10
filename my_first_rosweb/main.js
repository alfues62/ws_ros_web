document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")
    
    document.getElementById("btn_con").addEventListener("click", connect)
    document.getElementById("btn_dis").addEventListener("click", disconnect)
    document.getElementById("btn_move").addEventListener("click", move)
    document.getElementById("btn_stop").addEventListener("click", stop)
    document.getElementById("btn_to_point").addEventListener("click", () => {
        call_point_service(2.0 , 1.0)
    })
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
        },
        // service information 
        service_busy: false, 
        service_response: ''
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

    function call_point_service(x, y) {
        if (!ros.isConnected) {
            console.error("No hay conexión con ROS");
            return;
        }

        // Definir el servicio
        let service = new ROSLIB.Service({
            ros: ros,
            name: '/point_server', // Asegúrate de usar el nombre correcto del servicio
            serviceType: 'agro_mate_interface/srv/MyPointMsg' // Tipo de servicio correcto
        });

        // Crear la solicitud
        let request = new ROSLIB.ServiceRequest({
            x: x,
            y: y
        });

        // Llamar al servicio
        service.callService(request, (result) => {
            console.log("Respuesta del servicio:", result.success);
        }, (error) => {
            console.error("Error al llamar al servicio:", error);
        });
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