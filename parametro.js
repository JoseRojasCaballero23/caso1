document.addEventListener('DOMContentLoaded', () => {
    const archivoInput = document.getElementById('archivo');
    const subirArchivoButton = document.getElementById('subir-archivo');
    const fileList = document.getElementById('file-list');

    const url = new URL(window.location.href);
    let carpetaNombre = url.pathname.slice(1);

    if (!carpetaNombre || carpetaNombre.length !== 3) {
        carpetaNombre = generarCodigoAleatorio(3);
        window.history.replaceState({}, '', `/${carpetaNombre}`);
    } else {
        document.getElementById('codigo-aleatorio').textContent = carpetaNombre;
        cargarArchivos();
    }

    subirArchivoButton.addEventListener('click', () => {
        const archivos = Array.from(archivoInput.files);
        if (archivos.length > 0) {
            archivos.forEach(agregarArchivo);
        } else {
            alert('Por favor, seleccione al menos un archivo.');
        }
    });

    function agregarArchivo(file) {
        const archivos = obtenerArchivos();
        const archivoObj = {
            name: file.name,
            url: URL.createObjectURL(file)
        };
        archivos.push(archivoObj);
        localStorage.setItem(carpetaNombre, JSON.stringify(archivos));

        mostrarArchivos();
        archivoInput.value = '';
    }

    function obtenerArchivos() {
        const archivos = localStorage.getItem(carpetaNombre);
        return archivos ? JSON.parse(archivos) : [];
    }

    function mostrarArchivos() {
        fileList.innerHTML = '';
        const archivos = obtenerArchivos();
        archivos.forEach((archivo, index) => {
            const fileElement = document.createElement('li');
            fileElement.innerHTML = `
                <a href="${archivo.url}" download="${archivo.name}">${archivo.name}</a>
                <button onclick="eliminarArchivo(${index})">Eliminar</button>
            `;
            fileList.appendChild(fileElement);
        });
    }

    function generarCodigoAleatorio(tamano) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigoAleatorio = '';
        for (let i = 0; i < tamano; i++) {
            const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            codigoAleatorio += caracterAleatorio;
        }
        return codigoAleatorio;
    }

    function cargarArchivos() {
        mostrarArchivos();
        console.log('Cargando archivos para la carpeta...');
    }

    window.eliminarArchivo = function(index) {
        let archivos = obtenerArchivos();
        archivos.splice(index, 1);
        localStorage.setItem(carpetaNombre, JSON.stringify(archivos));
        mostrarArchivos();
    };
});





