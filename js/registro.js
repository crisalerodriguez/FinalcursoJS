// REGISTRO DE API // 
const url = 'https://jsonplaceholder.typicode.com/users'

fetch(url)
    .then( response => response.json() )
    .then( datausuario => dataname(datausuario) )

const dataname = (datausuario) => {      // <= RECIBO DE LA API LOS DATOS UNICAMENTE QUE ASIGUE
    console.log(datausuario)
    let body = ""
    for (let i = 0; i < datausuario.length; i++) {      
       body+=`<tr><td>${datausuario[i].id}</td><td>${datausuario[i].name}</ td><td>${datausuario[i].email}</td></tr>`
    }
    document.getElementById('datausuario').innerHTML = body
};

// REGISTRO DE USUARIO Y VALIDACIONES //
let campoNombre = document.getElementById("nombre");
let campoEmail = document.getElementById("email");

campoNombre.oninput = () => {
    if(isNaN(campoNombre.value)){
        //si no es un numero
        campoNombre.style.color="black";
    }else{
        campoNombre.style.color="red";
    }
}

//EVENTO SUBMIT
let formulario = document.getElementById("formulario");
formulario.addEventListener("submit",validar);

function validar(e){
    if((campoNombre.value=="")||(campoEmail.value=="")){
        e.preventDefault();//evitamos que se borren los campos porque faltan datos
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Completar EMAIL o NOMBRE correctamente!',
            footer: ''
          });
    };
};

