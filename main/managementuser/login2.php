<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../resource/estilos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <title>Registro</title>
</head>

<body>
    <header>
        <nav>
            <div class="bloque-incial">
                <h1 id="titulo-header">Reporte Vial</h1>
                <a href="../index.php"><button class="botonAgregar"><i class="fa-solid fa-arrow-left"></i> Volver a
                        inicio</button></a>
            </div>
            <ul>
                <li>Acceder <i class="fa-solid fa-arrow-right-to-bracket"></i></li>
                <li>Registrarse <i class="fa-solid fa-user-plus"></i></li>
            </ul>
        </nav>
    </header>

    <section class="container-fluid d-flex justify-content-center align-items-center contenedor-registro">
        <div class="formulario-registro">
            <h2>Iniciar sesión</h2>
            <form id="formularioIniciarSesion2">
                <div class="row pt-3">
                    <div class="col-12">
                        <?php

                        $usuario = $_GET['Usuario'];

                        echo "<input style='display:none;' type='text' name='Usuario' values='$usuario' >"


                            ?>
                        <label for="Contra" class="form-label">Contraseña</label>
                        <input type="text" class="form-control" name="Contra" id="Contra">
                    </div>
                </div>


                <div class="row pt-4">
                    <div class="col-12">
                        <button type="submit">Iniciar sesión</button>
                    </div>
                </div>
                <div class="row pt-4">
                    <div class="col-12">
                        <a href="#">
                            <p>¿ Olvido su Contraseña ?</p>
                        </a>

                    </div>
                </div>
        </form>
        </div>
    </section>




    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="../resource/mapa.js"></script>
</body>

</html>