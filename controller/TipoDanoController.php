<?php

require_once '../model/TipoDano.php';

 class TipoDanoController{

    public function listado(){

        $TipoDano = new TipoDano();

        $listado = $TipoDano->listado();

       if ($listado){

          echo json_encode(['status'=>'success', 'data'=>$listado]);
       }else{

          echo json_encode(['status'=>'error']);
       }


    }


}


?>