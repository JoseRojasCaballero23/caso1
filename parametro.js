document.addEventListener('DOMContentLoaded', () => {
    const archivoInput = document.getElementById('archivo');
    const subirArchivoButton = document.getElementById('subir-archivo');
    const fileList = document.getElementById('file-list');

    // Obtiene o genera el nombre de la carpeta basado en la URL
    const url = new URL(window.location.href);
    let carpetaNombre = url.pathname.slice(1);

    if (!carpetaNombre || carpetaNombre.length !== 3) {
        carpetaNombre = generarCodigoAleatorio(3);
        window.history.replaceState({}, '', `/${carpetaNombre}`);
    } else {
        document.getElementById('codigo-aleatorio').textContent = carpetaNombre;
    }

    // Cargar archivos de la carpeta actual al iniciar
    cargarArchivos();

    subirArchivoButton.addEventListener('click', () => {
        const archivos = Array.from(archivoInput.files);
        if (archivos.length > 0) {
            archivos.forEach(agregarArchivo);
            archivoInput.value = ''; // Resetear el input para permitir subir los mismos archivos
        } else {
            alert('Por favor, seleccione al menos un archivo.');
        }
    });

    function agregarArchivo(file) {
        const archivos = obtenerArchivos();
        const archivoObj = {
            name: file.name,
            url: URL.createObjectURL(file) // Generar URL simulada
        };
        archivos.push(archivoObj);
        localStorage.setItem(carpetaNombre, JSON.stringify(archivos));

        mostrarArchivos();
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
                <a href="${archivo.url}" download="${archivo.name}" class="archivo-link">${archivo.name}</a>
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
    }

    window.eliminarArchivo = function(index) {
        let archivos = obtenerArchivos();
        archivos.splice(index, 1);
        localStorage.setItem(carpetaNombre, JSON.stringify(archivos));
        mostrarArchivos();
    };
});






