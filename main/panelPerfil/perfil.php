
<?php

session_start();

$Usuario = $_SESSION['Usuario'];
$Cedula =$_SESSION['Cedula'];
$Correo =  $_SESSION['Correo'];

?>

<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='../../resource/estilos.css'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'>
    <script src='https://code.jquery.com/jquery-3.7.1.min.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
    <title>Registro</title>
</head>

<body>
    <header>
        <nav>
            <div class='bloque-incial'>
                <h1 id='titulo-header'>Reporte Vial</h1>
                <a href='../index.php'><button class='botonAgregar'><i class='fa-solid fa-arrow-left'></i> Volver a
                        inicio</button></a>
            </div>
        </nav>
    </header>

    <?php
    
    

    echo "<section class='editPerfil container-fluid d-flex justify-content-center align-items-center'>
        <div class='formulario-editar-perfil'>
            <h2>Mi perfil</h2>
            <div class='row mt-3'>
                <div class='col-12'>
                <label for='Nombre' class='form-label'>Usuario</label>
                    <div class='campo'>
                            <input type='text' value='$Usuario'  class='form-control' id='Usuario' readonly>
                        <button id='nombreBoton' data-bs-toggle='modal' data-bs-target='#CambiarDato' ><i class='fa-solid fa-pencil'></i></button>
                    </div>
                </div>
            </div>
            <div class='row mt-3'>
                <div class='col-12'>
                <label for='Correo' class='form-label'>Correo</label>
                    <div class='campo'>
                            <input type='text' value='$Correo'  class='form-control' id='Correo' readonly>
                        <button id='correoBoton' data-bs-toggle='modal' data-bs-target='#CambiarDato' ><i class='fa-solid fa-pencil'></i></button>
                    </div>
                </div>
            </div>
            <div class='row mt-3'>
                <div class='col-12'>
                <label for='Cedula' class='form-label'>Cédula</label>
                    <div class='campo'>
                            <input type='text' value='$Cedula' class='form-control' id='Cedula' readonly>
                        <button id='cedulaBoton' data-bs-toggle='modal' data-bs-target='#CambiarDato' ><i class='fa-solid fa-pencil'></i></button>
                    </div>
                </div>
            </div>
            <div class='row mt-5'>
                <div class='col-12'>
                    <button class='btn btn-warning w-100'>Cambiar Contraseña</button>
                </div>
            </div>
            <div class='row mt-3'>
                <div class='col-12'>
                    <button class='btn btn-danger w-100'>Eliminar cuenta</button>
                </div>
            </div>
        </div>


    </section>";

    echo "<div class='modal' id='CambiarDato' tabindex='-1'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title'>Modificar dato</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <form id='formularioEditarDato'>
      <div class='modal-body'>
        <label for='DatoActual' class='form-label'>Dato actual</label>
       <input type='text' class='form-control' id='DatoActual' readonly>
       <input style='display:none;' type='text' class='form-control' id='TipoDato' readonly>

       <label for='DatoNuevo' class='form-label pt-3'>Dato nuevo</label>
       <input type='text' name='DatoNuevo' class='form-control' id='DatoNuevo'>
      </div>
      <div class='modal-footer'>
        <button type='submit' class='btn w-100'>Guardar cambios</button>
      </div>
      </form>
    </div>
  </div>
</div>"


    ?>


    <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js'></script>
    <script src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=' crossorigin=''></script>
    <script src="../../resource/perfil.js" ></script>
</body>

</html>