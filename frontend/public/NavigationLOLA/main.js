//main.js
document.addEventListener('DOMContentLoaded', event => {
    console.log("entro en la pagina")
    
    document.getElementById("btn_con").addEventListener("click", connect)

    document.getElementById("punto1").addEventListener("click", () => {
        call_point_service(1, 1);
    })

    document.getElementById("punto2").addEventListener("click", () => {
        call_point_service(2, 2);
    })

    document.getElementById("punto3").addEventListener("click", () => {
        call_point_service(3, 3);
    })

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

    // Selecciona el elemento del documento donde quieres detectar la pulsación de teclas
document.addEventListener('keydown', function(event) {
    // El código dentro de esta función se ejecutará cada vez que se presione una tecla

    // Puedes verificar qué tecla se ha presionado utilizando event.key
    // Por ejemplo, si quieres detectar cuando se presiona la tecla 'Enter':
    if (event.key === 'W') {
        // Aquí ejecutas la acción que deseas realizar
        console.log('Se presionó la tecla W');
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })

        let linearVelocity = 0.1; // Default linear velocity
        let angularVelocity = 0; // Default angular velocity

        let message = new ROSLIB.Message({
            linear: {x: linearVelocity, y: 0, z: 0 },
            angular: {x: 0, y: 0, z: angularVelocity },
        })
        topic.publish(message)
        }

    // Otro ejemplo: detectar la tecla 'Esc' (Escape)
    if (event.key === 'A') {
        console.log('Se presionó la tecla A');
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })

        let linearVelocity = 0; // Default linear velocity
        let angularVelocity = -0.1; // Default angular velocity

        let message = new ROSLIB.Message({
            linear: {x: linearVelocity, y: 0, z: 0 },
            angular: {x: 0, y: 0, z: angularVelocity },
        })
        topic.publish(message)
    }

    // También puedes verificar el código de la tecla presionada utilizando event.keyCode (aunque key es preferido)
    // Por ejemplo, detectar la tecla 'A'
    if (event.key === 'S') {
        console.log('Se presionó la tecla S');
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

    if (event.key === 'D') {
        console.log('Se presionó la tecla D');
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })

        let linearVelocity = 0; // Default linear velocity
        let angularVelocity = 0.1; // Default angular velocity

        let message = new ROSLIB.Message({
            linear: {x: linearVelocity, y: 0, z: 0 },
            angular: {x: 0, y: 0, z: angularVelocity },
        })
        topic.publish(message)
    }

    if (event.key === 'X') {
        console.log('Se presionó la tecla X');
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })

        let linearVelocity = -0.1; // Default linear velocity
        let angularVelocity = 0; // Default angular velocity

        let message = new ROSLIB.Message({
            linear: {x: linearVelocity, y: 0, z: 0 },
            angular: {x: 0, y: 0, z: angularVelocity },
        })
        topic.publish(message)
    }

    
});

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
