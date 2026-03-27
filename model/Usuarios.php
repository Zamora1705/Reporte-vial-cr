<?php

require_once '../config/XEPDB1.php';

class Usuarios{
    private $DB;

    public function __construct(){

        $this->DB = DataBase ::connect();

    }

    public function create($Usuario, $Cedula, $Correo, $Contrasena){

        $sql = "INSERT INTO Usuarios (Nombre, Correo, Contrasena, Cedula)
        VALUES (:Usuario, :Correo, :Contrasena, :Cedula)";

        $smtp = oci_parse($this->DB, $sql);

        oci_bind_by_name($smtp, ':Usuario', $Usuario);
        oci_bind_by_name($smtp, ':Correo', $Correo);
        oci_bind_by_name($smtp, ':Contrasena', $Contrasena);
        oci_bind_by_name($smtp, ':Cedula', $Cedula);

        return oci_execute($smtp);
        
    }
}

?>