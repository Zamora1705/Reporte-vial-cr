<?php

require_once '../model/Provincia.php';

class ProvinciaController{

    public function listado(){

        $Provincia = new Provincia();

        $resultado = $Provincia->listado();

        echo json_encode(['status'=>'success', 'data'=>$resultado]);


    }


}


?>