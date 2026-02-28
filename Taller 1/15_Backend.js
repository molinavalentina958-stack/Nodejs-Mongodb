// 15. Flujo empresarial (Simulación Backend)

function autenticar(usuario, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!usuario || !password) {
                reject("Datos de acceso incompletos");
            } else if (usuario === "admin" && password === "3354") {
                resolve({ id: 2, nombre: "Valentina", rol: "Administrador" });
            } else {
                reject("Credenciales incorrectas");
            }
        }, 1000);
    });
}

function obtenerDatos(usuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!usuario || !usuario.id) {
                reject("Usuario no válido");
            } else {
                resolve({
                    ventas: [50000, 40000, 20000],
                    clientes: 3
                });
            }
        }, 1000);
    });
}

function procesarDatos(datos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!datos.ventas || datos.ventas.length === 0) {
                reject("No hay ventas para procesar");
            } else {
                const totalVentas = datos.ventas.reduce((acc, v) => acc + v, 0);
                resolve({
                    totalVentas,
                    clientes: datos.clientes,
                    promedioVenta: totalVentas / datos.ventas.length
                });
            }
        }, 1000);
    });
}

async function flujoEmpresarial() {
    try {
        console.log("Iniciando proceso empresarial...\n");

        const usuario = await autenticar("admin", "3354");
        console.log("Usuario autenticado:", usuario);

        const datos = await obtenerDatos(usuario);
        console.log("Datos obtenidos:", datos);

        const resultado = await procesarDatos(datos);
        console.log("Datos procesados:", resultado);

        console.log("\nRespuesta final enviada al cliente correctamente ");

    } catch (error) {
        console.error("Error en el proceso empresarial:", error);
    }
}

flujoEmpresarial();
