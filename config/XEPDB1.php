<?php

class DataBase{

public static function connect(){

$usuario = "REPORTEVIAL_ADMIN";
$contrasena = "RVA123";

$conexion = "localhost:1521/XEPDB1";

$conn = oci_connect($usuario, $contrasena, $conexion);

return new oci_connect($usuario, $contrasena, $conexion);

if (!$conn){
    $e = oci_error();
    echo "Error: " . $e['message'];
}else{
    echo "Conexión correcta";
}
}
}
?>