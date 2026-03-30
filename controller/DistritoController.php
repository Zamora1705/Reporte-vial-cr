<?php

require_once '../model/Distrito.php';

class DistritoController{

    public function listado(){

        $canton = $_GET['canton'];

        $Distrito = new Distrito();

        $resultado = $Distrito->listado($canton);

        echo json_encode(['status'=>'success', 'data'=>$resultado]);


    }


}


?>