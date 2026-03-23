<?php

$usuario = "ReporteVial_Admin";
$contrasena = "RVA123";

$conexion = "//DESKTOP-EU2CB1I:1521/XE";

$conn = oci_connect($usuario, $contrasena, $conexion);

if (!$conn){
    $e = oci_error();
    echo "Error: " . $e['message'];
}else{
    echo "Conexión correcta";
}

?>