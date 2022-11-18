const pintarCarrito = () => {

    modalContainer.innerHTML = "";               // <=  SIRVE PARA LIMPIAR EL CARRITO   //

    modalContainer.style.display = "flex";
   
    const modalHeader = document.createElement("div");    // CREO UNA VENTANITA PARA LA APARICION DE NUESTRO CARRITO //
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title"><img src="../imagenes/carrito1.png" class"ms-2">Mi Carrito</h1>
    
    `;

    modalContainer.append(modalHeader);

    const tabla = document.createElement("div")  
    tabla.className = "tablacarro"
    tabla.innerText = `tablita`;
    tabla.innerHTML = `
    <tr class="tablacarro">
            <h6 class="name">Producto</h6>
            <h6 class="canti">Cantidad</h6>
            <h6 class="dinero">Precio $</h6>
    </tr>
    `

    modalContainer.append(tabla);

    const modalButton = document.createElement("h2");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";

    });



    modalHeader.append(modalButton);

    carrito.forEach((product)=>{                                     // <= LE ASIGNO 
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content"
        carritoContent.innerHTML =  `
        <img class="fotocarro" src="${product.foto}">
        <h5 class="nomprodu">${product.nombre}</h5>
        <span class="restar"> - </span>
        <p class="cantidadprodu"> ${product.cantidad}</p>
        <span class="sumar" class="d-flex mb-4"> + </span>
        <p class="valor"> ${product.cantidad * product.precio}</p>
        <span class="eliminarproduct"> X </span>
    `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar")    // <= CAPTURA ID (al estilo css)
        restar.addEventListener("click", () => {               // <= Al hacer click se le resta una unidad si la unidad es diferente a 1
            if(product.cantidad !== 1){
            product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".eliminarproduct")    // <= CAPTURA ID (al estilo css)
        eliminar.addEventListener("click", () => {                     
            eliminarProducto(product.id);
            saveLocal();
            pintarCarrito();
            
            Swal.fire({                               // <= Al eliminar un X producto le agrego un sweetalert 
              position: 'top-end',
              icon: 'success',
              title: 'Producto eliminado',
              showConfirmButton: false,
              timer: 1500
            })
        })

    });

    const eliminarProducto = (id) => {                       // <=  METODO FIND buscame el id de cada producto //
        const idProducto = carrito.find((element) => element.id === id); 
    
        carrito = carrito.filter((carritoId)=>{          // <=  METODO FILTER filtro todo el carrito, pido que retorne todos los elementos que sean distintos a idProducto
            return carritoId !== idProducto;
        });
    
        carritoSuma();
        saveLocal();
        pintarCarrito();
    };

    
    const total = carrito.reduce((acumulador, prod)=> acumulador + prod.precio * 1.21 * prod.cantidad, 0);   // <= Aplico el METODO REDUCE, y le agrego un IVA del 21% al precio final. 

    const totalPrecio = document.createElement("div")                      // <= Creo un DIV
    totalPrecio.className = "totalprecio"                                 // <= Le asigno una clase
    totalPrecio.innerText = `Total a pagar + IVA: $ ${total}`;          
    totalPrecio.innerHTML = `
    <h5> Total a pagar + IVA: $ ${total}</h5>                          
    <a href="./index.html"><button class="fincompra"> Finalizar Compra </button></a>
    `
    modalContainer.append(totalPrecio);

    const fincompra = totalPrecio.querySelector(".fincompra")    // <= CAPTURA ID (al estilo css)
        fincompra.addEventListener("click", ()  => {
            
            modalContainer.innerHTML = "";                                              // <=  SIRVE PARA LIMPIAR EL CARRITO   //
            cantidadCarrito.innerHTML = "";
             
            const Toast = Swal.mixin({              // <= Sweetalert de compra finalizada
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                background: '#00699a',
                color: '#ffe9ef',
                timer: 1800,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
              
                Toast.fire({
                icon:'success',
                title:'GENIAL! Ya enviamos su email de confirmación'
            });

            localStorage.removeItem("carrito");   // <= Al finalizar la compra borro el contenido existente del carrito 
    
    });

    fincompra.onclick = () => {
        if(carrito.length==0){
            swal.fire({
                title: `El carrito esta vacio!`,
                text: `Por favor agregue un producto. Muchas gracias`,
                icon: `error`,
                showConfirmButton: false,
                timer: 2000

            })
        }
    };

    modalContainer.append(fincompra);
    
};


verCarrito.addEventListener("click", pintarCarrito);   // <=  EJECUTA EL PINTARCARRITO  //
