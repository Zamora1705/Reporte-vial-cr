<?php

require_once '../model/Historial.php';

class HistorialController{

  public function listadoMisReportes(){

     $Historial = new Historial();

     $usuario = $_POST['usuario'] ?? '';

     $resultado = $Historial->listadoMisReportes($usuario);

     if($resultado){

        echo json_encode(['status'=>'success', 'data'=>$resultado]);

     }else{

        echo json_encode(['status'=>'error']);


     }


  }



}




?>