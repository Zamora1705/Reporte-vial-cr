<?php

require_once '../model/Entidad.php';

class EntidadController{

public function listadoResponsables(){

     $Entidad = new Entidad();

     $resultado = $Entidad->listado();

     if($resultado){

        echo json_encode(['status'=>'success', 'data'=>$resultado]);

     }else{

        echo json_encode(['status'=>'error']);

     }
  
}

public function asigarResponsable(){
    
       $Entidad = new Entidad();

       $idreporte = $_POST['idreporteAsignar'] ?? '';
       $entidad = $_POST['entidadSelect'] ?? '';

       if($Entidad->create($idreporte, $entidad)){

          echo json_encode(['status'=>'success']);

       }else{

          echo json_encode(['status'=>'error']);

       }

}

}

?>