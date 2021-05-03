import { Funko } from "./funkoClass.js";

let listaFunkopop = [];
const modalProducto = new bootstrap.Modal(
  document.getElementById("modalFunkopop")
);

//varaiable bandera que me ayuda a decidir cuando modificar o cuando crear
//modificarFunkopop = true estoy modificando un producto, cuando sea false estoy cargando un nuevo Funko
let modificarFunkopop = false;


let btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", function () {
  limpiarFormulario();
  console.log("desde btn");
  modalProducto.show();
});

//llamar a la funcion que lee datos del local storage

leerDatos();

function agregarFunkopop () {
  console.log("Desde agragar funkopop");
  
  if(validarGeneral()){
    // parte 1
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let numSerie = document.getElementById("numSerie").value;
    let categoria = document.getElementById("categoria").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("imagen").value;
  
    //creo el nuevo producto funkopop
    let nuevoFunkopop = new Funko(
      codigo,
      nombre,
      numSerie,
      categoria,
      descripcion,
      imagen
    );
  
    //agrego el nuevo funkopop
    listaFunkopop.push(nuevoFunkopop);
  
    //guardar lista funkopop en localstorage
    localStorage.setItem("listaFunkoKey", JSON.stringify(listaFunkopop));
  
    //limpiar formulario
    limpiarFormulario();
  
    //mostrar el mensaje que el funko fue creado
    Swal.fire(
      "Nuevo Funkopop!",
      "El funkopop se agrego correctamente!",
      "success"
    );
  
    //llamar a leer dato
    leerDatos();
  
    //cerrar modal
    modalProducto.hide();
  }
  
}


function limpiarFormulario() {
  document.getElementById("formFunkopop").reset();
  modificarFunkopop=false;
}

function leerDatos() {
  //esta funcion se encargara de leer los datos del local storage
  if (localStorage.length > 0) {
    // traer los datos del local storage
    let _listafunkopop = JSON.parse(localStorage.getItem("listaFunkoKey"));
    console.log(_listafunkopop);

    // preguntar si mi arreglo lista funkopop tiene datos
    if (listaFunkopop.length === 0) {
      listaFunkopop = _listafunkopop;
    }

    dibujarDatosEnTabla(_listafunkopop);
  }
}

function dibujarDatosEnTabla(_listafunkopop) {
  //esta funcion se encargara de agregar datos de LS en la tabla
  let tabla = document.getElementById("tablaFunkopop");

  //borrar elementos hijos para limpiar la tabla
  tabla.innerHTML = "";

  //
  let filas;

  // for(let i = 0;i<_listafunkopop.length; i++){}
  // recorro todo el arreglo
  for (let i in _listafunkopop) {

    //cargar imagen por defecto
    // let imagen = ''

    // if(listaFunkopop[i].imagen === ''){
    //   imagen = 'thanos.png'
    // }else{

    // }

    filas = `<tr>
            <td>${_listafunkopop[i].codigo}</td>
            <td>${_listafunkopop[i].nombre}</td>
            <td>${_listafunkopop[i].numSerie}</td>
            <td>${_listafunkopop[i].categoria}</td>
            <td>${_listafunkopop[i].descripcion}</td>
            <td>${_listafunkopop[i].imagen}</td>
            <td>
                <button class="btn btn-warning" onclick="prepararFunkopop(this)" id="${_listafunkopop[i].codigo}">Editar</button>
                <button class="btn btn-danger" onclick="eliminarFunkopop(this)" id="${_listafunkopop[i].codigo}">Borrar</button>
            </td>
        </tr>`;

    //agregar filas a tabla
    tabla.innerHTML += filas;

    // tabla.innerHTML = tabla.inenerHTML + filas;
  }
}

window.eliminarFunkopop =  function(boton){
    console.log(boton.id)
    Swal.fire({
      title: 'Estas seguro de eliminar el Funkopop?',
      text: "No puedes volver atras luego de eliminar un Funkopop",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //agregar logica para eliminar funko
        // let funkopopFiltrado = listaFunkopop.filter(function(producto){
        //   return producto.codigo != boton.id;
        // })

        let funkopopFiltrado = listaFunkopop.filter((producto) => producto.codigo != boton.id)

        listaFunkopop = funkopopFiltrado;

        console.log(funkopopFiltrado);

        //guardar los datos en local stroage
        localStorage.setItem('listaFunkoKey', JSON.stringify(funkopopFiltrado))

        leerDatos()

        Swal.fire(
          'Borrado!',
          'El Funkopop seleccionado fue eliminado.',
          'success'
        )
      }
    })
}

window.prepararFunkopop = function(boton){
  console.log(boton)
  //buscar el funkopop seleccionado
  let funkopopEncontrado = listaFunkopop.find((producto) => {return producto.codigo === boton.id})
  console.log(funkopopEncontrado)

  //completar con los datos todos los imputs de mi formulario
  document.getElementById('codigo').value = funkopopEncontrado.codigo;
  document.getElementById('nombre').value = funkopopEncontrado.nombre;
  document.getElementById('numSerie').value = funkopopEncontrado.numSerie;
  document.getElementById('categoria').value = funkopopEncontrado.categoria;
  document.getElementById('descripcion').value = funkopopEncontrado.descripcion;
  document.getElementById('imagen').value = funkopopEncontrado.imagen;
  
  //
  modificarFunkopop=true;

  //mostrar ventana modal
  modalProducto.show()


}

window.guardarFunko = function(event){
  event.preventDefault();
  if(modificarFunkopop){
    //modificar funkopop existente
    modificarFunkoExistente();
  }else{
    agregarFunkopop();
  }
}

function modificarFunkoExistente(){
  //validar nuevamente los campos ingresados
  //tomar los valores modificados del formulario
  let codigo = document.getElementById('codigo').value
  let nombre = document.getElementById('nombre').value
  let numSerie = document.getElementById('numSerie').value
  let categoria = document.getElementById('categoria').value
  let descripcion = document.getElementById('descripcion').value
  let imagen = document.getElementById('imagen').value
  
  //buscar el ojeto y modifiicar el funko
  for(let i in listaFunkopop){

    if(listaFunkopop[i].codigo === codigo){
      listaFunkopop[i].nombre = nombre;
      listaFunkopop[i].numSerie = numSerie;
      listaFunkopop[i].categoria = categoria;
      listaFunkopop[i].descripcion = descripcion;
      listaFunkopop[i].imagen = imagen;
    }
  }
  //actualizo el local storage
  localStorage.setItem('listaFunkoKey', JSON.stringify(listaFunkopop));
  Swal.fire(
    "Funkopop modificado",
    "El funkopop seleccionado se modifico correctamente!",
    "success"
  );
  //dibujo los datos actualizados en la tabla
  leerDatos();
  
  //cerrar ventana modal
  modalProducto.hide();

}

//validaciones individuales
//validacion codigo
let codigo = document.getElementById('codigo')
codigo.addEventListener('blur', function(){
    validarCodigo()
})

function validarCodigo(){
    console.log('desde validar codigo');
    console.log(codigo.value);
    if(codigo.value.trim() === ""){
        codigo.className = 'form-control is-invalid';
        return false;
    } else{
        codigo.className = 'form-control is-valid';
        return true;
    }
}

//validacion nombre
let nombre = document.getElementById('nombre')
nombre.addEventListener('blur', function(){
    validarNombre()
})

function validarNombre(){
    console.log('desde validar nombre');
    console.log(nombre.value);
    if(nombre.value.trim() === ""){
        nombre.className = 'form-control is-invalid';
        return false;
    } else{
        nombre.className = 'form-control is-valid';
        return true;
    }
}

//validacion numSerie
let numSerie = document.getElementById('numSerie')
numSerie.addEventListener('blur', function(){
    validarNumSerie()
})

function validarNumSerie(){
    console.log('desde validar numSerie');
    console.log(numSerie.value);
    if(numSerie.value.trim() === ""){
        numSerie.className = 'form-control is-invalid';
        return false;
    } else{
        numSerie.className = 'form-control is-valid';
        return true;
    }
}

//validacion categoria
let categoria = document.getElementById('categoria')
categoria.addEventListener('blur', function(){
    validarCategoria()
})

function validarCategoria(){
    console.log('desde validar categoria');
    console.log(categoria.value);
    if(categoria.value.trim() === ""){
        categoria.className = 'form-control is-invalid';
        return false;
    } else{
        categoria.className = 'form-control is-valid';
        return true;
    }
}

//validacion descripcion
let descripcion = document.getElementById('descripcion')
descripcion.addEventListener('blur', function(){
    validarDescripcion()
})

function validarDescripcion(){
    console.log('desde validar descripcion');
    console.log(descripcion.value);
    if(descripcion.value.trim() === ""){
        descripcion.className = 'form-control is-invalid';
        return false;
    } else{
        descripcion.className = 'form-control is-valid';
        return true;
    }
}

//validacion imagen
let imagen = document.getElementById('imagen')
imagen.addEventListener('blur', function(){
    validarImagen()
})

function validarImagen(){
    console.log('desde validar imagen');
    console.log(imagen.value);
    if(imagen.value.trim() === ""){
        imagen.className = 'form-control is-invalid';
        return false;
    } else{
        imagen.className = 'form-control is-valid';
        return true;
    }
}

//validar general
function validarGeneral(){
   if(validarCodigo()&&validarNombre()&&validarNumSerie()&&validarCategoria()&&validarDescripcion()&&validarImagen()){
     alert('validacion general confirmada');
     return true;
   } else{
    alert('validacion general rechazada');
    return false;
   }
 }
 