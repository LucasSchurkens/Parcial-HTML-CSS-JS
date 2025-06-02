
/*Declaramos la lista de Frutas */
let arrayFrutas = [
    { id: 1,nombre: "anana",precio: 1000,imagen:"img/anana.jpg"},
    { id: 2,nombre: "arandano",precio: 1200,imagen:"img/arandano.jpg"},
    { id: 3,nombre: "banana",precio: 500,imagen:"img/banana.jpg"},
    { id: 4,nombre: "frambuesa",precio: 600,imagen:"img/frambuesa.png"},
    { id: 5,nombre: "frutilla",precio: 800,imagen:"img/frutilla.jpg"},
    { id: 6,nombre: "kiwi",precio: 800,imagen:"img/kiwi.jpg"},
    { id: 7,nombre: "mandarina",precio: 900,imagen:"img/mandarina.jpg"},
    { id: 8,nombre: "manzana",precio: 1000,imagen:"img/manzana.jpg"},
    { id: 9,nombre: "naranja",precio: 120,imagen:"img/naranja.jpg"},
    { id: 10,nombre: "pera",precio: 180,imagen:"img/pera.jpg"},
    { id: 11,nombre: "pomelo-amarillo",precio: 200,imagen:"img/pomelo-amarillo.jpg"},
    { id: 12,nombre: "pomelo-rojo",precio: 140,imagen:"img/pomelo-rojo.jpg"},
    { id: 13,nombre: "sandia",precio: 210,imagen:"img/sandia.jpg"},
];


/*declaramso el objeto alumno */
let alumno = {

    "dni": 47119881,
    "nombre": "Lucas",
    "apellido":"Schurkens"
}




/*VARIABLE GLOBALES*/

let contenedorNombreAlumno = document.querySelector(".nombreAlumno");
let contenedorProductos = document.querySelector(".contenedor-productos");
let inputBusqueda = document.querySelector(".barra-busqueda");

let carritoVacio = [];


let contenedorCarrito = document.getElementById("items-carrito");



let spanPrecioTotal= document.getElementById("precio-total");



let spanContadorCarrito= document.getElementById("contador-carrito");



let parrafoNoHayElementos = document.getElementById("noHayElementos");


let botonMenorPrecio = document.getElementById("menor-Precio");

let botonOrdenarNombre = document.getElementById("ordenarNombre");


let botonVaciar = document.getElementById("vaciar");

/*--------------------------------------------------------------------------------*/


/*En estta fucnion se imprime por consele log los datos del alumno y ademas se utilizan el el header */
function  imprimirDatosAlumno(){

    console.log(
        `Nombre:${alumno.nombre}, Apellido:${alumno.apellido}, DNI:${alumno.dni}`
    )

    let datosUsuario = ""; /*inusializo en string vacio para ir autocplementnado ¨*/

    datosUsuario +=  `<p>${alumno.nombre} ${alumno.apellido}</p>`

    /*lo inneramos al HTML*/
    contenedorNombreAlumno.innerHTML = datosUsuario;
}


/*declaramos para utilizar la fucnion iniciadora */

function init(){

    imprimirDatosAlumno();

    mostrarProductos(arrayFrutas);

    mostrarLocalStorage();
}





function mostrarProductos(lista){


    /*Ene sta funcionn vamos genrando las tarjetas de los rpductos, por lo cual decidi utilizar el for para ir accediendo bien a cad indice*/

    let cardProducto = ""; /*se incia en string vacio para ir agregadno la ifnoramciopn */

    for(let i =0; i<lista.length;i++){

        cardProducto +=
            `<div class="card-producto"> 
                <img src="${lista[i].imagen}">
                <h3>${lista[i].nombre}</h3>
                <p>$${lista[i].precio}</p>
                <button onClick="agregarCarrito(${lista[i].id})">Agregar al carrito</button>
            </div>`
    }

    /*insertamos todo el contenido genrado en el contendor de productos */
    contenedorProductos.innerHTML = cardProducto;

}



/*-----------------------------------------Filtro de los porductos a traves del input-------*/


/*estamos atentos a un click para que si eso pasa realizamos un determinada fucnion */
inputBusqueda.addEventListener("keyup",function(){

    let textoBusqueda = inputBusqueda.value.toLowerCase();

    let filtrados = arrayFrutas.filter(producto=>

        producto.nombre.includes(textoBusqueda)

    )


    /*como se genera un array de filtrados, debemos mostrarlo ese array */

    mostrarProductos(filtrados);

})




/*Esta funcion lo que hace es ir agregadno items a la lista del carrito la cual esta dentro de un div que guardamos en una variable local*/

function agregarCarrito(id){

    /*generamos una variable de un nuevo producto */

    let nuevoproducto = arrayFrutas.find(producto=>producto.id === id);

    /*agregamos ese producto a la lista vacia global*/


    carritoVacio.push(nuevoproducto);

    console.log(carritoVacio);

    /*llammos a l funcion de mostrar carrito */

    mostrarCarrito(carritoVacio)


    /*----Almacenamos en el LOCALSTORAGE-----*/

    // Convertimos el array 'carritoVacio' en una cadena de texto en formato JSON.

    let stringCarrito = JSON.stringify(carritoVacio); 


    // Guardamos el string en el almacenamiento local del navegador con el nombre "carritoDeCompras".
    localStorage.setItem("carritoDeCompras", stringCarrito);

}


function mostrarCarrito(lista){

    let listaDesornada = `<ul id="lista-items">`  //creamos la etiqueta para luego adjuntarla al contenedor Carrito//

    //evaluamos si hay elementos en la lsit//
    if (lista.length === 0) {

        //si no hay adjuntamos un parrafo que indique eso//
        contenedorCarrito.innerHTML = `<p>No hay elementos en el carrito.</p>`;
        return; //termianmos la ejecucion 
    }


    let precioTotal = 0; //inicalizamos el precio total en cero


    lista.forEach((producto, indice) => {

        listaDesornada +=  //a al lsiat desordena que inicializamos con la etiqueta anteriroremnte le vamos adjutnando cada bloqeu del producto//

        `<li class="bloque-item">
            <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>
            <button class="boton-eliminar" onClick="eliminarProducto(${indice})">Eliminar</button>
        </li>`

        precioTotal += producto.precio; //el precio total se va a ir sumando por cada precio de cada producto
    });


    listaDesornada += `</ul>`; //debemos cerrar la etiqueta  de la lista desordanda del contenedor

    contenedorCarrito.innerHTML = listaDesornada; //le adjuntamos la lista desordenada al contenedor

    spanPrecioTotal.innerHTML =precioTotal; //le adjuntamos el precio total al span//


    spanContadorCarrito.innerHTML = lista.length; //basciamente la cantidad de productos a ser igual que le largo de la lista de carrito


}


function eliminarProducto(indice){ 

    carritoVacio.splice(indice,1); //elimina el indice encontrado, el uno es cuantos debe elimianr

    mostrarCarrito(carritoVacio); //llamamos al mostrar carrito//



    if(carritoVacio.length===0){ //si esta vacio lo istanciamos en cero

        spanPrecioTotal.innerHTML = 0;

    }

    /*----Almacenamos en el LOCALSTORAGE-----*/

    let stringCarrito = JSON.stringify(carritoVacio);

    localStorage.setItem("carritoDeCompras", stringCarrito);


}



function mostrarLocalStorage(){
    // Obtengo la cadena JSON del carrito almacenado en localStorage y la convierte en objeto JS
    let carritoListaVieja = JSON.parse(localStorage.getItem("carritoDeCompras")); 

    if(carritoListaVieja !== null){ //solamente si no es null la mostamos ya que el localStorAGE se maneja con null

        carritoVacio = carritoListaVieja;

        mostrarCarrito(carritoListaVieja);
    }

}

//escucamos el evento del click para poder ordenrar//
botonMenorPrecio.addEventListener("click",()=>{
 
    inputBusqueda.value = ""; /*debemos reinciar el input value de la busqueda */

    let ordenadoMenor = arrayFrutas.sort((productoA, productoB) => productoA.precio - productoB.precio); /*utilizacion de arrow function en la logica del sort */
    
    mostrarProductos(ordenadoMenor); //llammos al mostrar para que muestre esa lista ordenad por determinada manera


})



botonOrdenarNombre.addEventListener("click",()=>{

    inputBusqueda.value = ""; /*debemos reinciar el input value de la busqueda */

    let ordenarNombre= arrayFrutas.sort((productoA, productoB) => productoA.nombre.localeCompare(productoB.nombre)); /*utilizacion de arrow function en la logica del sort */
    
    mostrarProductos(ordenarNombre);//llammos al mostrar para que muestre esa lista ordenad por determinada manera


})


//este fucnion la utilizamos para setar la lsiat del carrito en vacio y  a la vez el total y la cantidad
botonVaciar.addEventListener("click",()=>{

    carritoVacio = [];

    mostrarCarrito(carritoVacio);

    /*como no hay ningun elemento debo setear el total y la cantidad a cero */

    spanContadorCarrito.innerHTML = 0,

    spanPrecioTotal.innerHTML = 0;

    localStorage.clear(); //limpiamos el local Storage porque no hay nada del carrito para almacenarlo
    
})










init();