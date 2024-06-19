

// Configurar las credenciales (solo para pruebas y desarrollo)
AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
    region: 'us-east-1'  // Ajusta la región según sea necesario
});
// Función para obtener la imagen más reciente desde Amazon S3
async function getLatestImage(bucket) {
    const s3 = new AWS.S3();
    try {
        const response = await s3.listObjectsV2({ Bucket: bucket }).promise();
        if (!response.Contents || response.Contents.length === 0) {
            return null;
        }
        // Ordenar objetos por fecha de última modificación
        const sortedObjects = response.Contents.sort((a, b) => b.LastModified - a.LastModified);
        return sortedObjects[0].Key;
    } catch (err) {
        console.error('Error retrieving latest image:', err);
        return null;
    }
}

// Función para detectar etiquetas en una imagen usando Amazon Rekognition
async function detectLabels(photo, bucket) {
    const rekognition = new AWS.Rekognition();
    let paginationToken = null;
    let allLabels = [];

    try {
        do {
            const params = {
                Image: {
                    S3Object: {
                        Bucket: bucket,
                        Name: photo
                    }
                },
                MaxLabels: 10,
                NextToken: paginationToken
            };

            const response = await rekognition.detectLabels(params).promise();
            const labels = response.Labels || [];
            allLabels = allLabels.concat(labels);
            paginationToken = response.NextToken;
        } while (paginationToken);

        console.log('Detected labels for ' + photo);
        console.log();

        let orangeCount = 0;

        allLabels.forEach(label => {
            console.log('Label: ' + label.Name);
            console.log('Confidence: ' + label.Confidence);
            console.log('Instances:');

            if (label.Name === 'Orange') {
                orangeCount += (label.Instances || []).length;
            }

            (label.Instances || []).forEach(instance => {
                console.log(' Bounding box');
                console.log(' Top: ' + instance.BoundingBox.Top);
                console.log(' Left: ' + instance.BoundingBox.Left);
                console.log(' Width: ' + instance.BoundingBox.Width);
                console.log(' Height: ' + instance.BoundingBox.Height);
                console.log(' Confidence: ' + instance.Confidence);
                console.log();
            });

            console.log('Parents:');
            (label.Parents || []).forEach(parent => {
                console.log(' ' + parent.Name);
            });

            if (label.Aliases) {
                console.log('Aliases:');
                (label.Aliases || []).forEach(alias => {
                    console.log(' ' + alias.Name);
                });
            } else {
                console.log('Aliases: None');
            }

            console.log('Categories:');
            (label.Categories || []).forEach(category => {
                console.log(' ' + category.Name);
            });

            console.log('----------');
            console.log();
        });

        // Actualizar el conteo de naranjas en el elemento HTML
        console.log('Updating orange count:', orangeCount);
        document.getElementById('orange-count').textContent = orangeCount; // Ajusta según el entorno de ejecución

        return orangeCount;

    } catch (err) {
        console.error('Error detecting labels:', err);
        return 0;
    }
}


// Función principal
async function main() {
    const bucket = 'bucketiaalfues';  // Reemplaza con el nombre de tu bucket de S3

    try {
        const photo = await getLatestImage(bucket);
        if (photo) {
            console.log(`Analyzing latest image: ${photo}`);
            const orangeCount = await detectLabels(photo, bucket);
            console.log('Number of oranges detected:', orangeCount);
        } else {
            console.log('No images found in the bucket.');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

// Llamar a la función principal
main();
