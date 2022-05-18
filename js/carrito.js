class ServicioEnCarrito {
    constructor(id, nombre, cantidad, valor, total){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.valor = valor;
        this.total = total;
    }
}


let carrito = [];

let total = document.getElementById("cartTotal");

let cartHiredServicesContainer = document.getElementById("cartHiredServices");

let primerIngresoCarrito = true;

let carritoLocalStorage = JSON.parse(localStorage.getItem("arrayCart"));

let hireServicesButton = document.getElementById("hireServicesButton");

hireServicesButton.onclick = () => { contratar()};

if(primerIngresoCarrito){
    cartHiredServicesContainer.innerHTML = "";
    if(carritoLocalStorage){;
        carrito = carritoLocalStorage;
    
        for(let i=0; i<carrito.length; i++){
            cargaServicioCarrito(carrito[i], carrito[i].cantidad);
        }
        primerIngresoCarrito = false;
        totalCarrito(carrito);
    }
}

//CARGA DE SERVICIO AL CARRITO
async function agregarServicio (servicio){
    const { value: cantidad } = await Swal.fire({
        title: 'Ingrese la cantidad que desea contratar',
        input: 'number'
      })

    if(cantidad>0){

        primerIngresoCarrito = false;
        cargaServicioCarrito(servicio, cantidad);

        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones!',
            text: 'Servicio agregado correctamente'
          })

    }else if(cantidad<0){
        Swal.fire({
            icon: 'error',
            title: 'No se ha agregado el servicio',
            text: 'Debes seleccionar una cantidad mayor a 0 para agregarlo'
          })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'No se ha agregado el servicio',
            text: 'Debes seleccionar la cantidad para agregarlo'
          })
    } 
}

function cargaServicioCarrito (servicio, cantidad){
    let servicioCarrito;
    let servicioCargado = false;
    if(!primerIngresoCarrito){
        servicioCarrito = new ServicioEnCarrito (servicio.id, servicio.nombre, cantidad, servicio.valor, servicio.valor * parseInt(cantidad));
        servicioCargado = verificarServicioEnLocalStorage(servicioCarrito, cantidad);
    }else{
        servicioCarrito = servicio;
    }

    if(!servicioCargado || primerIngresoCarrito){
        generarFilaServicioDelCarrito(servicioCarrito);
    }
}

function verificarServicioEnLocalStorage(servicio, cantidad){
    let existe = false;
    carritoLocalStorage = JSON.parse(localStorage.getItem("arrayCart"));
    let existente = null;

    if(carritoLocalStorage != null){
        existente = carritoLocalStorage.find((serv) => serv.id == servicio.id);
    }
    
    if(existente){
        let index = carritoLocalStorage.findIndex((serv) => serv.id == existente.id);
        let cant = parseInt(carritoLocalStorage[index].cantidad) + parseInt(cantidad);
        let totalServicio = cant * parseInt(carritoLocalStorage[index].valor);
        carritoLocalStorage[index].cantidad = cant;
        carritoLocalStorage[index].total = totalServicio;
        localStorage.setItem("arrayCart", JSON.stringify(carritoLocalStorage));
        carrito = carritoLocalStorage;
        recargarCarrito();
        existe = true;
    }else{
        carrito.push(servicio);
        localStorage.setItem("arrayCart", JSON.stringify(carrito));
        totalCarrito(carrito);
    }

    return existe;
}

function generarFilaServicioDelCarrito(servicioCarrito){
    let fila = document.createElement("TR");
    fila.innerHTML =`<td class="cartColumnsInfo">${servicioCarrito.nombre}</td>
    <td class="cartColumnsInfo">
    <button class="sizeButton" id="increaseButton${servicioCarrito.id}">+</button>
    <p class="cant">${servicioCarrito.cantidad}</p>
    <button class="sizeButton" id="decreaseButton${servicioCarrito.id}">-</button>
    </td>
    <td class="cartColumnsInfo"><p>$ ${servicioCarrito.total}</p>
    <button class="deleteButton" id="deleteButton${servicioCarrito.id}"><img class="bin" src="../Imágenes/cesto.png"/></button></td>`;

    cartHiredServicesContainer.appendChild(fila);

    let botonAumentar = document.getElementById(`increaseButton${servicioCarrito.id}`);
    botonAumentar.onclick = () => { incrementarServicio(servicioCarrito)}

    let botonDecrementar = document.getElementById(`decreaseButton${servicioCarrito.id}`);
    botonDecrementar.onclick = () => { decrementarServicio(servicioCarrito)}

    let botonEliminar = document.getElementById(`deleteButton${servicioCarrito.id}`);
    botonEliminar.onclick = () => { eliminarServicioDelCarrito(servicioCarrito)}

    
}

function totalCarrito(localStorageServices){
    let totalCar = 0;
    for (let servicio of localStorageServices){
        totalCar += parseInt(servicio.total);
    }
    total.innerHTML = `<p>Total: $${totalCar}</p>`;
}

function recargarCarrito(){
    cartHiredServicesContainer.innerHTML = "";
    for(let servicioCarrito of carrito){
        generarFilaServicioDelCarrito(servicioCarrito);
    }

    totalCarrito(carrito);
}

function incrementarServicio(servicio){
    carritoLocalStorage = JSON.parse(localStorage.getItem("arrayCart"));
    let i = carritoLocalStorage.findIndex((serv) => serv.id == servicio.id);

    let cant = parseInt(carritoLocalStorage[i].cantidad) + 1;
    let totalServicio = cant * parseInt(carritoLocalStorage[i].valor);
    carritoLocalStorage[i].cantidad = cant;
    carritoLocalStorage[i].total = totalServicio;
    localStorage.setItem("arrayCart", JSON.stringify(carritoLocalStorage));
    carrito = carritoLocalStorage;
    recargarCarrito();
}

function decrementarServicio(servicio){
    if(servicio.cantidad == 1){
        eliminarServicioDelCarrito(servicio);
    }else{
        carritoLocalStorage = JSON.parse(localStorage.getItem("arrayCart"));
        let pos = carritoLocalStorage.findIndex((serv) => serv.id == servicio.id);

        let cant = parseInt(carritoLocalStorage[pos].cantidad) - 1;
        let totalServicio = cant * parseInt(carritoLocalStorage[pos].valor);
        carritoLocalStorage[pos].cantidad = cant;
        carritoLocalStorage[pos].total = totalServicio;
        localStorage.setItem("arrayCart", JSON.stringify(carritoLocalStorage));
        carrito = carritoLocalStorage;
        recargarCarrito();
    }
}

function eliminarServicioDelCarrito(servicio){
    carritoLocalStorage = JSON.parse(localStorage.getItem("arrayCart"));
    let posicion = carritoLocalStorage.findIndex((serv) => serv.id == servicio.id);

    carritoLocalStorage.splice(posicion, 1);
    localStorage.setItem("arrayCart", JSON.stringify(carritoLocalStorage));

    carrito = carritoLocalStorage;

    recargarCarrito();
}

function contratar(){
    carritoLocalStorage = JSON.parse(localStorage.getItem("arrayCart"));

    if(carritoLocalStorage !=null && carritoLocalStorage.length > 0){
        Swal.fire({
            icon: 'success',
            title: 'Muchas gracias por elegirnos!',
            text: 'Nos pondremos en contacto para resolver los pasos a seguir'
          })
          carrito = [];
          localStorage.setItem("arrayCart", JSON.stringify(carrito));
          recargarCarrito();
    }else{
        Swal.fire({
            icon: 'error',
            title: 'No tiene ningún servicio cargado',
            text: 'Debes presionar el botón "Agregar al carrito"'
          })
    }
}