let formulario = document.getElementById("form");

let lista = document.getElementById("lista");

formulario.addEventListener("submit", cargaServicio);

function cargaServicio(e){
    e.preventDefault();
    let dato = e.target;
    let checked;
    let  chequeado = document.getElementsByName("categoria");
    for(var i=0; i<chequeado.length; i++){
        if(chequeado[i].checked){
            checked = chequeado[i].value;
        }
    }
    let servicio = new Servicio(checked, dato.children[8].value, dato.children[10].value);
    console.log(dato.innerHTML);
    guardarServicio(localStorage.length, JSON.stringify(servicio));

    Swal.fire({
        icon: 'success',
        title: 'Servicio cargado correctamente!',
        text: 'Se añadirá a la lista'
      })
}

const guardarServicio = (clave, valor) => {localStorage.setItem(clave, valor)};

function agregarItem(texto) {
    let li = document.createElement('li');
    li.textContent = texto;
    return li;
}

function generarLista(e){
    let dato = e.target;
    let opcion = dato.value;
    switch(opcion){
        case "1":
            itemsFiltradosPorCategoria(1);
            break;
        case "2":
            itemsFiltradosPorCategoria(2);
            break;
        case "3":
            itemsFiltradosPorCategoria(3);
            break;
        default:
            break;    
    }
}

function itemsFiltradosPorCategoria(categoria){
    let item;
    lista.innerHTML = "";
    for(var i = 0; i < localStorage.length; i++){
        item = JSON.parse(localStorage.getItem(i));
        if(item.categoria == categoria){
            lista.appendChild(agregarItem(`${item.nombre} ............ $${item.valor}`));
        }
    }
}

let botonEntrevista = document.getElementById("entrevistas");
let botonTests = document.getElementById("tests");
let botonPruebas = document.getElementById("pruebas");

botonEntrevista.addEventListener("click", generarLista);
botonTests.addEventListener("click", generarLista);
botonPruebas.addEventListener("click", generarLista);