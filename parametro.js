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
        cargarArchivos(); // Cargar archivos guardados
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
      // Guarda el archivo en localStorage
      const archivos = obtenerArchivos();
      archivos.push(file.name);
      localStorage.setItem(carpetaNombre, JSON.stringify(archivos));

      mostrarArchivos(); // Actualiza la lista de archivos en la interfaz
      archivoInput.value = ''; // Limpiar el input después de subir el archivo
      debugInfo.textContent = `Archivo subido: ${file.name}`;
    }

    function obtenerArchivos() {
      const archivos = localStorage.getItem(carpetaNombre);
      return archivos ? JSON.parse(archivos) : [];
    }

    function mostrarArchivos() {
      fileList.innerHTML = ''; // Limpia la lista antes de mostrar los archivos
      const archivos = obtenerArchivos();
      archivos.forEach((archivo) => {
        const fileElement = document.createElement('li');
        fileElement.innerHTML = `
          ${archivo} <button onclick="descargarArchivo('${archivo}')">Descargar</button>
          <button onclick="eliminarArchivo('${archivo}')">Eliminar</button>
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
        mostrarArchivos(); // Mostrar archivos guardados
        console.log('Cargando archivos para la carpeta...');
    }

    // Funciones globales para eliminar y descargar archivos
    window.descargarArchivo = function(archivo) {
      // Aquí iría la lógica para descargar el archivo. En un entorno real, esto se haría mediante un servidor.
      alert('Funcionalidad de descarga no implementada');
    };

    window.eliminarArchivo = function(archivo) {
      let archivos = obtenerArchivos();
      archivos = archivos.filter(f => f !== archivo);
      localStorage.setItem(carpetaNombre, JSON.stringify(archivos));
      mostrarArchivos(); // Actualiza la lista después de eliminar un archivo
    };
});




