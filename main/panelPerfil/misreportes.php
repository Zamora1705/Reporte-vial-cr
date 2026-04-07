
<?php

session_start();

if (isset($_SESSION['Usuario'])) {

    $Cedula = $_SESSION['Cedula'];

    echo "<input value='$Cedula' type='text' style='display:none;' id='Identidad' ></input>";
    
}


?>

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
        </nav>
    </header>


        <h2 style="padding-top:150px;color:white;text-align:center;" >Historial de reportes</h2>
        <div class="seccion-misreportes">
            <table class="table table-dark" >
                <thead>
                    <tr>
                        <th>Daño</th>
                        <th>Tipo de daño</th>
                        <th>Categoria</th>
                        <th>Provincia</th>
                        <th>Cantón</th>
                        <th>Distrito</th>
                        <th>Calle</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id='tablaMisReportes' >
                    
                    
                    
                </tbody>


            </table>
        
        </div>






    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="../resource/mapa.js"></script>
    <script src="../../resource/misreportes.js" ></script>
    
</body>

</html>