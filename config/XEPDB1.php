<?php

$usuario = "REPORTEVIAL_ADMIN";
$contrasena = "RVA123";

$conexion = "192.168.100.196:1521/XE";

$conn = oci_connect($usuario, $contrasena, $conexion);

if (!$conn){
    $e = oci_error();
    echo "Error: " . $e['message'];
}else{
    echo "Conexión correcta";
}

?>