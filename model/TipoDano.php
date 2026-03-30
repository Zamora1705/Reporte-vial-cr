<?php

require_once '../config/XEPDB1.php';

class TipoDano{

    private $DB;

    public function __construct(){

        $this->DB=DataBase::connect();
    }

    public function listadoDATA(){

        $query = "SELECT Dano_ID, Nombre_dano FROM Tipo_dano";

        $smtp = oci_parse($this->DB, $query);

        oci_execute($smtp);

        $result = [];

        while($row = oci_fetch_assoc($smtp)){

            $filaLimpia = [];

            foreach($row as $key => $value){

              $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

            }

            $result[] = $filaLimpia;
        }

        return $result;
    }
}
?>

