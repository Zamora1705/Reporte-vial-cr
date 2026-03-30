<?php

require_once '../model/Categoria.php';

class CategoriaController{

    public function listado(){

        $Categoria = new Categoria();

        $resultado = $Categoria->listado();

        echo json_encode(['status'=>'success', 'data'=>$resultado]);


    }


}


?>