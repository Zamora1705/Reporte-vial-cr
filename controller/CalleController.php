<?php

require_once '../model/Calle.php';

class CalleController{

    public function listado(){

        $distrito = $_GET['distrito'];

        $Calle = new Calle();

        $resultado = $Calle->listado($distrito);

        echo json_encode(['status'=>'success', 'data'=>$resultado]);


    }


}


?>