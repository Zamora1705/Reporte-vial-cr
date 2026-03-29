<?php

require_once '../config/XEPDB1';

class TipoDano{

    private $DB;

    public function __construct(){

        $this->DB=DataBase::connect();
    }

    public function listado(){

        $query = "SELECT Dano_ID, Nombre_dano FROM Tipo_dano";

        $smtp = oci_parse($this->DB, $query);

        oci_execute($smtp);

        $row = oci_fetch_assoc($smtp);

        return $row;



    }



}

?>