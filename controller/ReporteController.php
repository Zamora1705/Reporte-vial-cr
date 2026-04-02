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

    public function obtenerReporteByID(){

        $Reporte = new Reporte();

        $idReporte = $_GET['reporte_id'] ?? '';

        $resultado = $Reporte->obtenerReporteByID($idReporte);

        if($resultado){

            echo json_encode(['status'=>'success', 'data'=>$resultado]);

        }else{

            echo json_encode(['status'=>'error']);

        }
    }

    public function editarReporte(){

    $Reporte = new Reporte();

       
        $Tipodano = $_POST['tipodano'];
        $Categoria = $_POST['Categoria'];
        $Provincia = $_POST['Provincia'];
        $Canton = $_POST['Canton'];
        $Distrito = $_POST['Distrito'];
        $Calle = $_POST['calle'];
        $idReporte = $_POST['idreporte'];

        if($Reporte->editarReporte( $Tipodano, $Categoria, $Provincia, $Canton, $Distrito, $Calle, $idReporte)){

         echo json_encode(['status'=>'success']);

        }else{

           echo json_encode(['status'=>'error']);
        }


    }

    public function eliminarReporte(){

        $Reporte = new Reporte();

        $idreporte = $_POST['idreporte'] ?? '';

        if($Reporte->eliminarReporte($idreporte)){

             echo json_encode(['status'=>'success']);
        }else{

             echo json_encode(['status'=>'error']);
        }

    }


}


?>