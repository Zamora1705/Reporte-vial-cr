<?php

require_once '../model/Canton.php';

class CantonController{

    public function listado(){

        $provincia = $_GET['provincia'];

        $Canton = new Canton();

        $resultado = $Canton->listado($provincia);

        echo json_encode(['status'=>'success', 'data'=>$resultado]);


    }


}


?>