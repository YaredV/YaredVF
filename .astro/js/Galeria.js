class Galeria {

    constructor(configuracion) {
        this.current = { columna: 0, fila: 0 };
        this.columnas = configuracion.columnas;
    }

    SetCurrent(current) {
        this.current = current
        return this.columnas[this.current.columna].imagenes[this.current.fila]
    }

    Anterior() {
        if (this.current.columna > 0) {
            this.current.columna--;
        }
        else if (this.current.fila > 0) {
            this.current.fila--;
            this.current.columna = this.columnas.length - 1;
        }
        else {
            this.current.columna = this.columnas.length - 1;
            this.current.fila = this.columnas[this.current.columna].imagenes.length - 1;
        }
        return this.columnas[this.current.columna].imagenes[this.current.fila]
    }

    Siguiente() {

        if (this.current.columna < (this.columnas.length - 1)) {
            this.current.columna++;            
        }
        else if ((this.current.fila + 1) < this.columnas[0].imagenes.length) {
            this.current.columna = 0;
            this.current.fila++;
        }
        else {
            this.current = { columna: 0, fila: 0 };
        }
        return this.columnas[this.current.columna].imagenes[this.current.fila]
    }

}

const galerias = document.querySelectorAll(".galeria-componente");

galerias.forEach(galeria => {

    const config = JSON.parse(galeria.dataset.config)

    const galeriaHandler = new Galeria(config)
    const modal = new bootstrap.Modal(document.getElementById("galeria-modal-" + config.id), {});

    const galeriaVisor = document.getElementById('galeria-modal-visor-' + config.id)
    const galeriaTitulo = document.getElementById('galeria-modal-visor-titulo-' + config.id)

    const imagenes = document.querySelectorAll(".galeria-imagen.galeria-" + config.id);
    imagenes.forEach(imagen => {
        imagen.addEventListener("click", () => {
            current = JSON.parse(imagen.dataset.current);
            const img = galeriaHandler.SetCurrent(current);
            setImagen(img);
            modal.show()
        })
    }) 

    const anterior = document.getElementById("galeria-modal-anterior-" + config.id);
    anterior.addEventListener("click", () => {
        const img = galeriaHandler.Anterior();
        setImagen(img);
    })

    const siguiente = document.getElementById("galeria-modal-siguiente-" + config.id);
    siguiente.addEventListener("click", () => {
        const img = galeriaHandler.Siguiente();
        setImagen(img);
    })

    function setImagen(imagen) {
        galeriaVisor.src = imagen.src;
        galeriaVisor.alt = imagen.alt;
        galeriaTitulo.innerHTML = imagen.titulo;
    }

})

