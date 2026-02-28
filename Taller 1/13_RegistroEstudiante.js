// 13. Registro de estudiante 

let estudiantes = [
  { nombre: "Juan", edad: 20 },
  { nombre: "María", edad: 22 },
  { nombre: "Pedro", edad: 19 }
];

function guardarEstudiante(nombre, edad) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if ( estudiantes.find(est => est.nombre === nombre) ) {
        reject("Nombre ya está registrado");
        return;
      }
      else {
        (estudiantes.push({ nombre: nombre, edad: edad }));
            resolve("Estudiante guardado correctamente");
      }
    }, 1000);
  });
}

guardarEstudiante("Valentina", 20)
  .then(mensaje => {
    console.log(mensaje);
    console.log("Lista actualizada de estudiantes:");
    console.log(estudiantes); 
  })
  .catch(error => {
    console.error("Error:", error);
  });
