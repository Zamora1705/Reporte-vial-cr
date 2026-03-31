<?php

require_once '../model/Reporte.php';

class ReporteController{

    public function create(){

        $Reporte = new Reporte();

        $Longitud = $_POST['Longitud'];
        $Latitud = $_POST['Latitud'];
        $Tipodano = $_POST['tipodano'];
        $Categoria = $_POST['Categoria'];
        $Provincia = $_POST['Provincia'];
        $Canton = $_POST['Canton'];
        $Distrito = $_POST['Distrito'];
        $Calle = $_POST['calle'];
    

        if($Reporte->create($Longitud, $Latitud, $Tipodano, $Categoria, $Provincia, $Canton, $Distrito, $Calle)){

            echo json_encode(['status'=>'success']);


        }else{

            echo json_encode(['status'=>'error']);
        }



    }

    public function listado(){

        $Reporte = new Reporte();

        $data = $Reporte->listado();

        echo json_encode(['status'=>'success', 'data'=>$data]);
    }


}


?>