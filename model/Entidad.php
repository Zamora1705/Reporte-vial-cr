<?php

require_once '../config/XEPDB1.php';

class Entidad{

   private $DB;

   public function __construct(){

      $this->DB = DataBase :: connect();


   }

   public function listado(){

       $query = "SELECT ER_ID, Nombre_Entidad FROM Entidad_responsable";

       $smtp = oci_parse($this->DB, $query);

       oci_execute($smtp);

       $listado = [];

          while($row = oci_fetch_assoc($smtp)){

             $filaLimpia = [];
             foreach($row as $key => $value){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');
             }

             $listado []=$filaLimpia;

       }

       return $listado;


   }

   public function create($idreporte, $entidad){

      $query = "INSERT INTO Reporte_designado (Reporte_FK, Entidad_Responsable) VALUES (:idreporte, :entidad)";
      $queryCommit = "COMMIT";

      $smtp = oci_parse($this->DB, $query);
      $smtpCommit = oci_parse($this->DB, $queryCommit);

      oci_bind_by_name($smtp, ':idreporte', $idreporte);
      oci_bind_by_name($smtp, ':entidad', $entidad);

      $result = oci_execute($smtp);
      oci_execute($smtpCommit);

      return $result;

   }


}


?>