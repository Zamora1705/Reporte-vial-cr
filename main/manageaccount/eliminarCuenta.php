<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../../resource/estilos.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
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
        </nav>
    </header>

    <div class="container-fluid section-eliminar-cuenta d-flex align-items-center justify-content-center">
        <div class="content bg-dark">
            <div class="body-content">
                <h2>Eliminar cuenta</h2>
                <p>Eliminar tu cuenta es una acción permanente que implica la pérdida total de tu información dentro de
                    nuestra plataforma. Antes de continuar, te recomendamos leer cuidadosamente los siguientes puntos:
                    Pérdida de datos: Al eliminar tu cuenta, se borrarán de forma irreversible todos tus datos,
                    incluyendo tu perfil, historial, configuraciones y cualquier contenido asociado.
                    Acceso limitado: Una vez iniciado el proceso, no podrás acceder nuevamente a tu cuenta ni recuperar
                    la información almacenada.
                    Periodo de recuperación: Dispondrás de un periodo de 10 días desde la solicitud para cancelar la
                    eliminación. Durante este tiempo, podrás restaurar tu cuenta iniciando sesión nuevamente.
                    Eliminación permanente: Después de transcurrido el periodo de recuperación, tu cuenta será eliminada
                    de forma definitiva y no podrá ser restaurada bajo ninguna circunstancia.
                    Impacto en servicios: Podrías perder acceso a servicios, beneficios o funcionalidades vinculadas a
                    tu cuenta.
                    Si estás completamente seguro de continuar, puedes proceder con la eliminación. De lo contrario, te
                    recomendamos mantener tu cuenta activa para evitar la pérdida de información importante.
                    Esta acción no se puede deshacer una vez completada.</p>

                <p>Para continuar con la eliminación de la cuenta, escriba <strong>ACEPTO ELIMINAR MI CUENTA Y CONOZCO
                        LAS CONSECUENCIAS</strong></p>
                <form id="formularioEliminarCuenta">
                    <input type="text" class="form-control" id="TextoEliminar"></input>
                    <button class="btn btn-danger w-100 mt-4">Eliminar cuenta</button>
                </form>

            </div>
        </div>


    </div>










    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="../../resource/perfil.js" ></script>
</body>

</html>