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
    
    //falta incorporar función para sumar en el carrito  
}

function cargaServicioCarrito (servicio, cantidad){
    let servicioCarrito;
    let servicioCargado = false;
    if(!primerIngresoCarrito){
        servicioCarrito = new ServicioEnCarrito (servicio.id, servicio.nombre, cantidad, servicio.valor, servicio.valor);
        servicioCargado = verificarServicioEnLocalStorage(servicioCarrito, cantidad);
    }else{
        servicioCarrito = servicio;
    }

    if(!servicioCargado || primerIngresoCarrito){
        cartHiredServicesContainer.innerHTML +=`<tr><td class="cartColumnsInfo">${servicioCarrito.nombre}</td>
                                        <td class="cartColumnsInfo">${servicioCarrito.cantidad}</td>
                                        <td class="cartColumnsInfo">${servicioCarrito.total}</td></tr>`
    }
    
}

function verificarServicioEnLocalStorage(servicio, cantidad){
    let existe = false;
    let arrayLocalStorage = JSON.parse(localStorage.getItem("arrayCart"));
    let existente = null;

    if(arrayLocalStorage != null){
        existente = arrayLocalStorage.find((serv) => serv.id == servicio.id);
    }
    
    if(existente){
        let index = arrayLocalStorage.findIndex((serv) => serv.id == existente.id);
        cant = parseInt(arrayLocalStorage[index].cantidad) + parseInt(cantidad);
        total = cant * parseInt(arrayLocalStorage[index].valor);
        arrayLocalStorage[index].cantidad = cant;
        arrayLocalStorage[index].total = total;
        localStorage.setItem("arrayCart", JSON.stringify(arrayLocalStorage));
        carrito = arrayLocalStorage;
        recargarCarrito();
        existe = true;
    }else{
        carrito.push(servicio);
        localStorage.setItem("arrayCart", JSON.stringify(carrito));
        totalCarrito(carrito);
    }

    return existe;
}

function totalCarrito(localStorageServices){
    let totalCar = 0;
    for (let servicio of localStorageServices){
        totalCar += parseInt(servicio.total);
    }
    localStorage.setItem("cartTotal", totalCar);
    total.innerHTML = "";
    total.innerHTML = `<p>Total: $${totalCar}</p>`;
}

function recargarCarrito(){
    cartHiredServicesContainer.innerHTML = "";
    for(let servicioCarrito of carrito){
        cartHiredServicesContainer.innerHTML +=`<tr><td class="cartColumnsInfo">${servicioCarrito.nombre}</td>
                                        <td class="cartColumnsInfo">${servicioCarrito.cantidad}</td>
                                        <td class="cartColumnsInfo">${servicioCarrito.total}</td></tr>`
    }

    totalCarrito(carrito);
}