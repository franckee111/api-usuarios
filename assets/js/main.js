console.log("Entro al main.js");

const base_url_api = "http://ucamp.alumnos.dev4humans.com.mx";
const tblUsuarios = document.getElementById('tblUsuarios');
const alumnos = "Main/alumnos";
const url = `http://ucamp.alumnos.dev4humans.com.mx/${alumnos}`;

function cargarUsuario(base_url_api){ 
    // console.log(url);

    fetch(url, {method: "GET"})
        .then( (response) => response.json())
        .then( (data) => {
            console.log(data);
            tblUsuarios.innerHTML = ""; // limpiar registros
            for(const usuario of data.data){
                let tr = `<tr>
                    <td> ${usuario.id} </td>    
                    <td> ${usuario.nombre} </td>
                    <td> ${usuario.paterno} </td>
                    <td> ${usuario.materno} </td>
                    <td> ${usuario.email} </td>
                </tr>`;
                tblUsuarios.innerHTML += tr;
            }
            if (data.lenght == 0){
                tblUsuarios.innerHTML = `<tr> <td colspan="5" class="text-center">No hay usuarios</td></tr>`;
            }
        } )
        .catch( (error) => console.log(error));
}

function agregarUsuario(){
    console.log("Entró a la función agregarUsuario");

    let form_data = new FormData();
    form_data.append("nombre", document.getElementById("nombre").value);
    form_data.append("paterno", document.getElementById("paterno").value);
    form_data.append("materno", document.getElementById("materno").value);
    form_data.append("email", document.getElementById("email").value);

    // console.log(form_data);
    
    fetch(url, 
            {
                method: "POST",
                body: form_data
            })
        .then( (response) => response.json())
        .then( (data) => {
            console.log(data);
            limpiarFormulario();
            cargarUsuario();
        } )
        .catch( (error) => console.log(error));
}

function limpiarFormulario(){
    document.getElementById("nombre").value = "";
    document.getElementById("paterno").value = "";
    document.getElementById("materno").value = "";
    document.getElementById("email").value = "";
}

function toggleButton(){
    console.log("Entró validaFormulario()");
    const btnAgregar = document.getElementById('btnAgregar');
    const varValida = 1;

    // btnAgregar.enable = true;
    

    if(varValida != 0){
        btnAgregar.disabled = false;
    } else{
        btnAgregar.disabled = true; 
    }
    
    // if( document.getElementById("nombre").value != ""){
    //     btnAgregar.enable = true;
    // } else{
    //     btnAgregar.enable = false;
    // }
    // document.getElementById("nombre").value ? "" : (document.getElementById("btnAgregar").Disabled = true);
}

// function keyPress(){
//     console.log(document.getElementById('nombre').addEventListener("keypress"));
//     // document.getElementById('nombre').addEventListener("keypress")
// }

cargarUsuario();