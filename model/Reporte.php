<?php

require_once '../config/XEPDB1.php';

class Reporte{

    private $DB;

    public function __construct(){

        $this->DB = DataBase :: connect();
    }

    public function create($Longitud, $Latitud, $Tipodano, $Categoria, $Usuario, $Provincia, $Canton, $Distrito, $Calle){

        $query = "INSERT INTO Reporte (Tipo_Dano_FK, Categoria_FK, Usuario_FK, Calle_FK, Longitud, Latitud, Provincia
        _nom, Canton_nom, Distrito_nom) VALUES (:Tipodano, :Categoria, :Usuario, :Calle, :Longitud, :Latitud,
        :Provincia, :Canton, :Distrito)";

        $queryCommit = 'COMMIT';

        $smtp = oci_parse($this->DB, $query);
        $smtpCommit = oci_parse($this->DB, $queryCommit);

        oci_bind_by_name($smtp, ':Longitud', $Longitud);
        oci_bind_by_name($smtp, ':Latitud', $Latitud);
        oci_bind_by_name($smtp, ':Tipodano', $Tipodano);
        oci_bind_by_name($smtp, ':Categoria', $Categoria);
        oci_bind_by_name($smtp, ':Usuario', $Usuario);
        oci_bind_by_name($smtp, ':Provincia', $Provincia);
        oci_bind_by_name($smtp, ':Canton', $Canton);
        oci_bind_by_name($smtp, ':Distrito', $Distrito);
        oci_bind_by_name($smtp, ':Calle', $Calle);

        $result = oci_execute($smtp);
        oci_execute($smtpCommit);

        return $result;
    }
}



?>