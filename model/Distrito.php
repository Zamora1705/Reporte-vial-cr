<?php

require_once '../config/XEPDB1.php';

class Distrito{

    private $DB;

    public function __construct(){

        $this->DB=DataBase::connect();
    }

    public function listado($canton){

        $query = "SELECT * FROM Distrito INNER JOIN Canton ON Canton_FK = Canton_ID WHERE Nombre_Canton = :canton";

        $smtp=oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':canton', $canton);

        oci_execute($smtp);

        $result = [];

        while($row = oci_fetch_assoc($smtp)){

            $filaLimpia= [];

            foreach($row as $key => $value){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');
            }

            $result[]=$filaLimpia;
        }

        return $result;
    }

}


?>