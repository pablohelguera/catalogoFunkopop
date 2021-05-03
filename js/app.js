// variable que almacena los datos del LS
let listaFunkopop = [];

leerFunkopop();

function leerFunkopop(){
    if(localStorage.length > 0 ){
        listaFunkopop = JSON.parse(localStorage.getItem('listaFunkoKey'))
    //borrar los datos de las filas de cards
    let filaCards = document.getElementById('filaCards')
    filaCards.innerHTML = '';

    // dibujar cada uno de los fukos
    for(let i in listaFunkopop){
        let columna = `<div class="col-md-3 col-sm-6 my-2">
        <div class="card w-100 shadow">
            <img src="img/productos/${listaFunkopop[i].imagen}" class="card-img-top" alt="${listaFunkopop[i].nombre}">
            <div class="card-body">
                <h5 class="card-title">${listaFunkopop[i].nombre}</h5>
                <p class="card-text">${listaFunkopop[i].descripcion}</p>
                <a href="#" class="btn btn-primary disable">Ver más</a>
            </div>
        </div>
    </div>`;

    // agregar las columnas a su elemento padre
    filaCards.innerHTML += columna;
    }
    }
}