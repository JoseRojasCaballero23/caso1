document.addEventListener('DOMContentLoaded', () => {
    const archivoInput = document.getElementById('archivo');
    const subirArchivoButton = document.getElementById('subir-archivo');
    const fileList = document.getElementById('file-list');
    const debugInfo = document.getElementById('debug-info');

    // Verificar si la URL ya contiene un código de tres caracteres
    const url = new URL(window.location.href);
    let carpetaNombre = url.pathname.slice(1); // Obtiene el código actual en la URL

    if (!carpetaNombre || carpetaNombre.length !== 3) {
        carpetaNombre = generarCodigoAleatorio(3); // Genera un nuevo código
        window.history.replaceState({}, '', `/${carpetaNombre}`);
    } else {
        document.getElementById('codigo-aleatorio').textContent = carpetaNombre; // Muestra el código en la página
        cargarArchivos(); // Cargar archivos si es necesario
    }

    subirArchivoButton.addEventListener('click', () => {
      const file = archivoInput.files[0];
      if (file) {
        agregarArchivo(file);
      } else {
        alert('Por favor, seleccione un archivo primero.');
      }
    });

    function agregarArchivo(file) {
      const fileElement = document.createElement('li');
      fileElement.textContent = file.name;
      fileList.appendChild(fileElement);
      debugInfo.textContent = `Archivo subido: ${file.name}`;
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
        // Implementar la lógica para cargar archivos aquí si es necesario
        console.log('Cargando archivos para la carpeta...');
    }
});




