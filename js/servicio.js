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

//carga de servicios por json

const cargaServiciosJson = async () => {
    const resp = await
    fetch('../json/servicios.json')
    const data = await resp.json()
    console.log(data)
    
    //genero la clase contenedora 
    let serviceContainer = document.createElement("div");
    serviceContainer.className = "serviceSectionContainer";

    data.forEach(servicio => {
        //genero el recuadro del servicio
        let box = document.createElement("div");
        box.className = "box";
        //genero el div que contiene al servicio
        let service = document.createElement("div");
        service.className = "service";
        box.appendChild(service);
        //genero img para el logo
        let img = document.createElement("img"); 
        let logo = (servicio.categoria == 1) ? 
        "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/60/000000/external-interviews-job-search-flaticons-lineal-color-flat-icons.png" :
        (servicio.categoria == 2) ?
        "https://img.icons8.com/dusk/64/000000/mind-map--v1.png" :
        "https://img.icons8.com/external-justicon-lineal-color-justicon/60/000000/external-exam-back-to-school-justicon-lineal-color-justicon.png";
        img.src = logo;
        //service.appendChild(img);
        service.innerHTML = `<img src=${logo}/>
                            <h4>${servicio.nombre}</h4>
                            <p>Valor: ${servicio.valor}</p>
                            <button class="cartButton">Añadir al carrito</button>`
        let hiringServiceContainer = document.getElementsByClassName("hiringServiceContainer");
        serviceContainer.appendChild(box);
        hiringServiceContainer[0].appendChild(serviceContainer);
    });
}    
cargaServiciosJson()
