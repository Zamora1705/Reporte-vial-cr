<?php

require_once '../config/XEPDB1.php';

class Canton{

    private $DB;

    public function __construct(){

        $this->DB=DataBase::connect();
    }

    public function listado($provincia){

        $query = "SELECT * FROM Canton INNER JOIN Provincia ON Provincia_FK = Provincia_ID WHERE Nombre_provincia = :provincia";

        $smtp=oci_parse($this->DB, $query);

        oci_bind_by_name($query, ':provincia', $provincia);

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