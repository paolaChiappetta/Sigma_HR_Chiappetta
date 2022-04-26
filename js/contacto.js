let contactButton = document.getElementsByClassName("contactButton");

contactButton[0].addEventListener("click", mensajeContacto);

function mensajeContacto(){
    Swal.fire({
        icon: 'success',
        title: 'Su mensaje fue enviado!',
        text: 'En breve nos pondremos en contacto con usted'
      })

    //falta incorporar envío de mensaje  
}