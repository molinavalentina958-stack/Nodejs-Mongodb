// 3. Sistema de calificaciones 

const estudiantes = [
  { nombre: "Ana", notas: [4.0, 3.5, 5.0] },
  { nombre: "Luis", notas: [] },
];

function validarEstudiantes(estudiante) {
  return new Promise((resolve, reject) => {
    if (!estudiante.notas || estudiante.notas.length === 0) {
      reject(`Estudiante ${estudiante.nombre} no tiene notas.`);
    } else {
      const suma = estudiante.notas.reduce((acum, nota) => acum + nota, 0);
      const promedio = suma / estudiante.notas.length;
      const aprobado = promedio >= 3.0;
      const reprobado = !aprobado
      resolve({ promedio, aprobado, reprobado });
    }
  });
}

async function generarReporte(estudiantes) {
  const listaProcesada = [];
  const totalAprobados = [];
  const totalReprobados = [];

  for (const estudiante of estudiantes) {
    try {
      const { promedio, aprobado, reprobado } = await validarEstudiantes(estudiante);
      listaProcesada.push({ nombre: estudiante.nombre, promedio, aprobado, reprobado });
      if (aprobado) {
        totalAprobados.push({ nombre: estudiante.nombre, promedio,});
      } else {
        totalReprobados.push(promedio);
      }
    } catch (error) {
      totalReprobados.push({
        nombre: estudiante.nombre,
        error: error
      });
    }
  }

  return {
    listaProcesada,
    totalAprobados,
    totalReprobados
  };
}

generarReporte(estudiantes).then(reporte => {
  console.log("Lista procesada:", reporte.listaProcesada);
  console.log("Estudiantes aprobados:", reporte.totalAprobados);
  console.log("Estudiantes reprobados:", reporte.totalReprobados);
});
