<?php

require_once '../config/XEPDB1.php';

class Calle{

    private $DB;

    public function __construct(){

        $this->DB=DataBase::connect();
    }

    public function listado($distrito){

        $query = "SELECT * FROM Calle_Report INNER JOIN Distrito ON Distrito_FK = Distrito_ID WHERE Nombre_Distrito = :distrito";

        $smtp=oci_parse($this->DB, $query);

        oci_bind_by_name($query, ':distrito', $distrito);

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