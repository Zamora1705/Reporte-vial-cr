<?php


require_once '../model/TipoDano.php';

 class TipoDanoController{

    public function listado(){
     
     
        $TipoDano = new TipoDano();
        $listado = $TipoDano->listadoDATA();
        echo json_encode(['status'=>'success', 'data'=>$listado]);
       
    }
}
?>