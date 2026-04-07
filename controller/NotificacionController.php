<?php

require_once '../model/Notificacion.php';

class NotificacionController{

   public function create(){

   $noti = new Notificacion();

   $usuario = $_POST['Usuario_FK'] ?? '';
   $entidad = $_POST['entidad'] ?? '';

   if($noti->create($usuario, $entidad)){

        echo json_encode(['status'=>'success']);

   }else{

        echo json_encode(['status'=>'error']);
   }



   }

   public function listado(){

      $noti = new Notificacion();

      $usuario = $_POST['usuario'] ?? '';

      $resultado = $noti->listado($usuario);

      if($resultado){

          echo json_encode(['status'=>'success', 'data'=>$resultado]);

      }else{

          echo json_encode(['status'=>'error']);

      }


   }

   public function eliminarNotificacion(){

       $noti = new Notificacion();

       $idreporte = $_POST['idnotificacion'];

       if($noti->eliminarNotificacion($idreporte)){

          echo json_encode(['status'=>'success']);

       }else{

          echo json_encode(['status'=>'error']);

       }


   }


}


?>