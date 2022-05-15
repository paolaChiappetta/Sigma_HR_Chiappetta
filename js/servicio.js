class Servicio {
    constructor(categoria, nombre, valor){
        this.categoria = categoria;
        this.nombre = nombre;
        this.valor = valor;
    }
}

let hiringServiceContainer = document.getElementsByClassName("hiringServiceContainer");

let primerIngreso = true;

//CARGA GENERAL DE TODOS LOS SERVICIOS DEL JSON - se reutiliza también para cargar servicios con filtro por categoría
const cargaServiciosJson = async (filtroCategoria) => {
    const resp = await
    fetch('../json/servicios.json')
    const data = await resp.json()
    
    //genero la clase contenedora 
    let serviceContainer = document.createElement("div");
    serviceContainer.className = "serviceSectionContainer";

    let arrayFiltradoPorCategoria;
    if(filtroCategoria != 0){
        arrayFiltradoPorCategoria =  data.filter((servicio) => servicio.categoria == filtroCategoria);
    }else{
        arrayFiltradoPorCategoria = data;
    }

    arrayFiltradoPorCategoria.forEach(servicio => {
        //genero el recuadro del servicio
        let box = document.createElement("div");
        box.className = "box";
        //genero el div que contiene al servicio
        let service = document.createElement("div");
        service.className = "service";
        box.appendChild(service);
        //asigno el logo según categoría 
        let logo = (servicio.categoria == 1) ? 
        "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/60/000000/external-interviews-job-search-flaticons-lineal-color-flat-icons.png" :
        (servicio.categoria == 2) ?
        "https://img.icons8.com/dusk/64/000000/mind-map--v1.png" :
        "https://img.icons8.com/external-justicon-lineal-color-justicon/60/000000/external-exam-back-to-school-justicon-lineal-color-justicon.png";
            
        service.innerHTML = `<img src=${logo}/>
                            <h4>${servicio.nombre}</h4>
                            <p>Valor: ${servicio.valor}</p>
                            <button id= "cartButton${servicio.id}" class="cartButton">Añadir al carrito</button>`
            
        serviceContainer.appendChild(box);
        hiringServiceContainer[0].appendChild(serviceContainer);
        //agrego la funcionalidad al botón
        let boton = document.getElementById(`cartButton${servicio.id}`);
        boton.addEventListener("click", agregarServicio);

    });
}

if(primerIngreso){
    cargaServiciosJson(0);
}

//FILTRO DE VISTA DE SERVICIOS POR CATEGORÍA

let serviceFilterForm = document.getElementsByClassName("serviceFilterForm");

serviceFilterForm[0].addEventListener("submit", filtrarServiciosPorCategoria);

function filtrarServiciosPorCategoria(e){
    e.preventDefault();
    let checked;
    let  chequeado = document.getElementsByName("categoriaFiltro");
    for(let i=0; i<chequeado.length; i++){
        if(chequeado[i].checked){
            checked = chequeado[i].value;
        }
    }
    hiringServiceContainer[0].innerHTML = "";
    primerIngreso = false;
    cargaServiciosJson(checked);
}


//CARGA DE NUEVOS SERVICIOS POR EL ADMIN
let addServiceButton = document.getElementsByClassName("addServiceButton");
let addServiceForm = document.getElementsByClassName("addServiceForm");
addServiceForm[0].style.display = 'none';


addServiceButton[0].addEventListener("click", setVisibleAddServiceForm);

function setVisibleAddServiceForm (){
    addServiceForm[0].style.display = 'block';
}


