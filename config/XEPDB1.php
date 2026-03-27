<?php

class DataBase{

public static function connect(){

$usuario = "REPORTEVIAL_ADMIN";
$contrasena = "RVA123";

$conexion = "localhost:1521/XEPDB1";

$conn = oci_connect($usuario, $contrasena, $conexion);

return $conn;
}
}
?>