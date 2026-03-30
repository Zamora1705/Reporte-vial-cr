<?php

session_start();


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../resource/estilos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <title>Inicio</title>
</head>

<body>
    <header>
        <nav>
            <div class="bloque-incial">
                <h1 id="titulo-header">Reporte Vial</h1>
                <button class="botonAgregar">Crear reporte <i class="fa-solid fa-plus"></i></button>
                <?php
                if (isset($_SESSION['Usuario'])) {

                    echo " <p class='bienvenida' >Bienvenido, " . $_SESSION['Usuario'] . "</p>";
                }

                ?>
            </div>
            <ul>
                <?php

                if (isset($_SESSION['Usuario'])) {

                    echo "<li>
                    <div class='dropdown'>
                        <button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton'
                            data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                            <i class='fa-solid fa-user'></i>
                        </button>
                        <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                            <a href='panelPerfil/perfil.php' class='dropdown-item'>Mi perfil</a>
                            <a href='panelPerfil/notificaciones.php' class='dropdown-item'>Notificaciones</a>
                            <a href='panelPerfil/misreportes.php' class='dropdown-item'>Mis reportes</a>
                            <a href='panelPerfil/logout.php' class='dropdown-item'>Cerrar sesión <i class='fa-solid fa-arrow-right-from-bracket'></i></a>
                        </div>
                    </div>
                </li>";
                } else

                    echo "<li><a href='managementuser/login.php'>Acceder <i class='fa-solid fa-arrow-right-to-bracket'></i></a>
                </li>
                <li><a href='managementuser/registro.php'>Registrarse <i class='fa-solidfa-user-plus'></i></a></li>";




                ?>
            </ul>
        </nav>
    </header>

    <section class="main">
        <div class="container-fluid">
            <div class="row">
                <div class="panelOperativo col-2">
                    <ul>
                        <li>
                            <div class="busqueda">
                                <h2>Busqueda de reportes</h2>
                                <input type="text" class="form-control" placeholder="Buscar reporte">
                                <select name="" class="filtro1_dano" placeholder="Tipo de daño" id="">
                                    <option value="">Tipo de daño</option>
                                </select>
                                <select name="" class="filtro2_dano" id="">
                                    <option value="">Categoria de daño</option>
                                </select>
                                <button class="button-busqueda">Realizar busqueda <i
                                        class='fa-solid fa-magnifying-glass'></i></button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-10">
                    <div id="map"></div>

                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container-fluid">
            <div class="row">
                <div class="col-4">
                    <div class="contact-content">

                        <form action="">
                            <h2>Contactenos</h2>

                            <label for="name" class="form-label mt-2">Nombre completo</label>
                            <input type="text" id="name" class="form-control" placeholder="Ingrese su nombre completo">

                            <label for="correo" class="form-label mt-2">Correo electronico</label>
                            <input type="text" id="correo" class="form-control"
                                placeholder="Ingrese su correo electronico">


                            <label for="motivo" class="form-label mt-2">Motivo</label>
                            <textarea name="motivo" id="motivo" class="form-control" row="30"
                                placeholder="Ingrese el motivo de contactarnos"></textarea>

                            <button style="border-radius:12px;height:60px;"
                                class="btn-primary mt-4 w-100">Enviar</button>
                        </form>
                    </div>
                </div>
                <div class="col-4">

                </div>
                <div class="content-socialmedia col-4">
                    <ul>
                        <li class="facebook">
                            <a href=""><i class="fa-brands fa-facebook"></i>
                                <p>@RPV_CR</p>
                            </a>
                        </li>
                        <li class="instagram">
                            <a href=""><i class="fa-brands fa-instagram"></i>
                                <p>@RPV_CR</p>
                            </a>
                        </li>
                        <li class="x">
                            <a href=""><i class="fa-brands fa-twitter"></i>
                                <p>@RPV_CR</p>
                            </a>
                        </li>
                        <li class="youtube">
                            <a href=""><i class="fa-brands fa-youtube"></i>
                                <p>@RPV_CR</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>

    <div class='modal' id='nuevoReporte' tabindex='-1'>
        <div class='modal-dialog'>
            <div class='modal-content'>
                <div class='modal-header'>
                    <h5 class='modal-title'>Reportar Daño</h5>
                    <button type='button' id="botonCerrarModel" class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                </div>
                <form id='formularioNuevoReporte'>
                    <div class='modal-body'>
                        <div class="select">
                            <label for="tipodano" class="form-label">Tipo de daño</label>
                            <select name="tipodano" class="form-control" id="tipodano">
                                <option value="">Seleccione el tipo de daño</option>
                            </select>
                        </div>
                        <div class="select mt-3">
                            <label for="Categoria" class="form-label">Categoría del daño</label>
                            <select name="Categoria" class="form-control" id="Categoria">
                               
                            </select>
                        </div>
                        <div class="select mt-3">
                            <label for="Provincia" class="form-label">Provincia</label>
                            <select name="Provincia" class="form-control" id="Provincia">
                                
                            </select>
                        </div>
                        <div id="bloqueCanton" class="select mt-3">
                            <label for="Canton" class="form-label">Cantón</label>
                            <select name="Canton" class="form-control" id="Canton">
                              
                            </select>
                        </div>
                        <div id="bloqueDistrito" class="select mt-3">
                            <label for="Distrito" class="form-label">Distrito (opcional)</label>
                            <select name="Distrito" class="form-control" id="Distrito">
                              
                            </select>
                        </div>
                        <div id="bloqueCalle" class="select mt-3">
                            <label for="calle" class="form-label">Nombre de la calle (opcional)</label>
                            <select name="calle" class="form-control" id="calle">
                
                            </select>
            
                            <input style="display:none;" type="text" name="Longitud" id="Longitud" >
                            <input style="display:none;" type="text" name="Latitud" id="Latitud" >
                           
                        </div>
                    <div class='modal-footer'>
                        <button type='submit' class='btn w-100'>Generar reporte</button>
                    </div>
                </form>
            </div>
        </div>
    </div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="../resource/mapa.js"></script>
</body>

</html>