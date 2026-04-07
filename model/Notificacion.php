<?php

require_once '../config/XEPDB1.php';

class Notificacion{

   private $DB;

   public function __construct (){

        $this->DB = DataBase :: connect();
   }

   public function create($usuario, $entidad){

      $query= "INSERT INTO Notificacion (Entidad_responsable_FK, Usuario_FK, Comentario) 
      VALUES (:entidad, :usuario, :comentario)";

      $smtp = oci_parse($this->DB, $query);

      $comentario = "Reporte reparado satisfactoriamente";

      oci_bind_by_name($smtp, ':entidad', $entidad);
      oci_bind_by_name($smtp, ':usuario', $usuario);
      oci_bind_by_name($smtp, ':comentario', $comentario);

      $resultado = oci_execute($smtp);

      return $resultado;

   }

   public function listado($usuario){

       $query = "SELECT * FROM Notificacion WHERE Usuario_FK = :Usuario";

       $smtp = oci_parse($this->DB, $query);

       oci_bind_by_name($smtp, ':Usuario', $usuario);

       oci_execute($smtp);

       $datos = [];

       while($row = oci_fetch_assoc($smtp)){

          $filaLimpia = [];

            foreach($row as $key => $value){

                $filaLimpia [$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

            }

            $datos[] = $filaLimpia;

       }

       return $datos;


   }

   public function eliminarNotificacion($idreporte){

        $query = "DELETE FROM Notificacion WHERE Notificacion_ID = :idreporte";
        $queryCommit = 'COMMIT';

        $smtp = oci_parse($this->DB, $query);
        $smtpCommit = oci_parse($this->DB, $queryCommit);

        oci_bind_by_name($smtp, ':idreporte', $idreporte);

        $resultado = oci_execute($smtp);
        oci_execute($smtpCommit);

        return $resultado;

   }


}


?>