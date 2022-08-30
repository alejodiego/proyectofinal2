
//CONTROL DE ACCESO

document.getElementById("botonAcceso").addEventListener("click", acceso);

function acceso() {
    let usuarioDeAcceso = document.getElementById("usuarioDeAcceso").value;
    let passDeAcceso = document.getElementById("passDeAcceso").value;
    localStorage.setItem("usuario", usuarioDeAcceso);
    localStorage.setItem("clave", passDeAcceso);
}

let usuario = localStorage.getItem("usuario");
let clave = parseInt(localStorage.getItem("clave"));
if (usuario == "admin" && clave == 1234) {
    Swal.fire('Bienvenido ' + usuario + ' al sistema de personal.')
    document.getElementById("acceso").classList.add("ocultar");
    document.getElementById("sistemaPrincipal").classList.remove("ocultar");
    document.getElementById("sistemaPrincipal").classList.add("mostrar");
} else {
    Swal.fire('Usuario o contraseña no valida.');
}

//FIN CONTROL ACCESO


let nombre = "";
let apellido = "";
let mail = "";
const personal = [];
let opcion = 0;

class Persona {
    constructor(nombre, apellido, mail) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.mail = mail,
            this.ausencias = 0
    }
}

function cargarPersonal() {
    nombre = prompt("Ingrese nombre: ");
    apellido = prompt("Ingrese apellido: ");
    mail = prompt("Ingrese mail: ");
}

function alta() {
    let alta = "";
    do {
        sessionStorage.clear();
        cargarPersonal();
        const persona1 = new Persona(nombre, apellido, mail);
        personal.push(persona1);
        Swal.fire({
            title: 'Desea dar de alta una nueva persona ?',
            text: "----------------",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            let confirmar;
            if (result.isConfirmed) {
                confirmar = "si";
                sessionStorage.setItem("alta", confirmar);

            } else {
                confirmar = "no";
                sessionStorage.setItem("alta", confirmar);

            }
        })
        alta = sessionStorage.getItem("alta");
        console.log(alta); //aca hay un problema, me muestra null
    } while (alta == "si");
}

function baja() {
    let baja = prompt("Desea dar de baja una persona ? (si/no): ");
    while (baja == "si") {
        let eliminar = prompt("Ingrese el nombre del empleado a eliminar: ")
        for (i = 0; i <= personal.length; i++) {
            if (personal[i].nombre == eliminar) {
                //alert("Persona a eliminar: " + personal[i].nombre);
                Swal.fire("Persona a eliminar: " + personal[i].nombre);
                personal.splice(i, 1);
                break;
            }
        }
        baja = prompt("Desea seguir eliminando personal si/no: ")
    }
}
function mostrarPersonas() {
    let mostrarPersonal = [];
    for (Persona of personal) {
        mostrarPersonal.push(Persona.nombre);
    }
    alert(mostrarPersonal.join("*"));
}

document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);

function cerrarSesion() {
    localStorage.clear();
    window.location.reload();
}





