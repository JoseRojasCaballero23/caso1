document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    let carpetaNombre = url.pathname.slice(1);

    if (!carpetaNombre || carpetaNombre.length !== 3) {
        carpetaNombre = generarCadenaAleatoria(3);
        window.history.replaceState({}, '', `/${carpetaNombre}`);
    } else {
        document.getElementById('link').textContent += carpetaNombre;
        cargarArchivos();
    }

    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('archivo');
        const file = fileInput.files[0];
        if (file) {
            agregarArchivo(file);
        } else {
            alert('Por favor, seleccione un archivo primero.');
        }
    });

    const dropArea = document.getElementById('drop-area');
    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('drag-over');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('drag-over');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) {
            agregarArchivo(file);
        }
    });
});

function generarCadenaAleatoria(tamano) {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < tamano; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}

function agregarArchivo(file) {
    console.log('Archivo subido:', file.name);
    const fileList = document.getElementById('file-list');
    const fileElement = document.createElement('div');
    fileElement.className = 'archivos_subidos';
    fileElement.innerHTML = `
        <div><a href="#" class="boton-descargar">${file.name}</a></div>
    `;
    fileList.appendChild(fileElement);
}

function cargarArchivos() {
    console.log('Cargando archivos para la carpeta...');
}



