<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Paso 1: PHP funciona <br>";

require_once '../config/XEPDB1.php';
echo "Paso 2: Config cargada <br>";

$conn = DataBase::connect();
echo "Paso 3: Conexion Oracle OK <br>";

$query = "SELECT Dano_ID, Nombre_dano FROM Tipo_dano";
$stmt = oci_parse($conn, $query);
echo "Paso 4: Query parseado <br>";

oci_execute($stmt);
echo "Paso 5: Query ejecutado <br>";

$result = [];
while($row = oci_fetch_assoc($stmt)){
    $result[] = $row;
}
echo "Paso 6: Datos obtenidos <br>";

echo "<pre>";
print_r($result);
echo "</pre>";