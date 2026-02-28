// 6. Filtrar productos 

let productos = [
  { nombre: "Laptop", precio: 2000000 },
  { nombre: "Nevera", precio: 1000000 },
  { nombre: "Celular", precio: 5000000 },
  { nombre: "Estufa", precio: 1000000 },
  { nombre: "Tablet", precio: 900000 }
];

function filtrarProductos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const filtrados = productos.filter(producto => producto.precio > 1500000);
      
      if (filtrados.length > 0) {
        resolve(filtrados);
      } else {
        reject("No se encontraron productos");
      }
    }, 1000);
  });
}

async function ejecutarFiltro() {
  try {
    const resultado = await filtrarProductos();
    console.log("Productos filtrados:", resultado);
  } catch (error) {
    console.error(error);
  }
}

ejecutarFiltro();
