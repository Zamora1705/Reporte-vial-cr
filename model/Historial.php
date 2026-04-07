<?php

require_once '../config/XEPDB1.php';

class Historial{

  private $DB;

  public function __construct (){

     $this->DB = DataBase :: connect();

  }

  public function listadoMisReportes($usuario){

     $query = "SELECT * FROM Historial_reporte WHERE Usuario_FK = :Usuario";

     $smtp = oci_parse($this->DB, $query);

     oci_bind_by_name($smtp, ':Usuario', $usuario);

     oci_execute($smtp);

     $datos = [];

     while($row = oci_fetch_assoc($smtp)){

        $filaLimpia = [];

        foreach($row as $key => $value){

           $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

        }

        $datos[] = $filaLimpia;


     }


     return $datos;




  }


}


?>