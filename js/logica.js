const tarjetasProduct = document.getElementById("tarjetasProduct");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const botonCarrito = document.getElementById("botonCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product)=> {                            // <= Creo las TARJETAS QUE APARECEN EN EL HTML.
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    
        <img src=${product.foto} class="cardimg" alt="...">
        
            <h6 class="card-title">ID: ${product.id}</h6>
            <h5 class="card-text">${product.nombre}</h5>
            <p class="card-text">$ ${product.precio}</p>
        
    `;

    tarjetasProduct.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Agregar al carrito";
    comprar.className = "comprar";

    content.append(comprar);                      // <=  PERMITE ADJUNTAR UN OBJETO DESPUES DEL ULTIMO ELEMENTO HIJO DEL ELEMENTO PADRE //

    comprar.addEventListener("click", () =>{      // <=  ES UN ESCUCHADOR DE EVENTOS //

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);   // <=  METODO SOME devuelve metodo true o false, buscamos un producto repetido que sea igual al ID //
        if (repeat){
            carrito.map((prod) => {  // Recorro el carrito y si "producto" es igual a "producto.id" se le suma 1
                if(prod.id === product.id){  
                    prod.cantidad++;  // ++ es igual a poner +1 // Aumenta el valor de la variable en 1
                }
            });

        } else {
        carrito.push({         // <=  METODO PUSH  //
            id: product.id,
            foto: product.foto,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,         
        });
        
        Swal.fire({        // <= Agrego un Sweetalert cada vez que agreguen un producto al carrito
            title: product.nombre,
            text: 'Se agregó al carrito correctamente!!',
            background: "#d0d3da",
            imageUrl: product.foto,
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: product.nombre,
          });
        console.log(carrito);
        console.log(carrito.length);
        
        carritoSuma();
        saveLocal(); 
        };
    });
});

const carritoSuma = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

};

carritoSuma();

function saveLocal() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

JSON.parse(localStorage.getItem("carrito")); // <= GET ITEM obtenemos eso que guardamos en SET ITEM

