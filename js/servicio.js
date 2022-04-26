class Servicio {
    constructor(categoria, nombre, valor){
        this.categoria = categoria;
        this.nombre = nombre;
        this.valor = valor;
    }
}

//agregar al carrito

let cartButton = document.getElementsByClassName("cartButton");

for(let i = 0; i < cartButton.length; i++){
    cartButton[i].addEventListener("click", agregarServicio);
}

async function agregarServicio (){
    const { value: cantidad } = await Swal.fire({
        title: 'Ingrese la cantidad que desea contratar',
        input: 'number'
      })

    if(cantidad){
        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones!',
            text: 'Servicio agregado correctamente'
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


//carga servicios nuevos
let addServiceButton = document.getElementsByClassName("addServiceButton");
let addServiceForm = document.getElementsByClassName("addServiceForm");
addServiceForm[0].style.display = 'none';


addServiceButton[0].addEventListener("click", setVisibleAddServiceForm);

function setVisibleAddServiceForm (){
    addServiceForm[0].style.display = 'block';
}