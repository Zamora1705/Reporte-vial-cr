<?php

require_once "../model/Usuarios.php";

class UsuariosController{

    public function create (){
        $Usuarios = new Usuarios();

        $Usuario = $_POST['Usuario'] ?? '';
        $Cedula = $_POST['Cedula'] ?? '';
        $Correo = $_POST['Correo'] ?? '';
        $Contrasena = $_POST['Contrasena'] ?? '';
        $PasswordHash = password_hash($Contrasena, PASSWORD_BCRYPT);

        if($Usuarios->create($Usuario, $Cedula, $Correo, $PasswordHash)){

             echo json_encode(['status'=>'success']);

        }else{

             echo json_encode(['status'=>'error']); 
        }


    }

    public function buscarUsuario(){

        $Usuarios = new Usuarios();

        $Usuario = $_POST['Usuario'] ?? '';

        $resultado = $Usuarios->BuscarUsuario($Usuario);

        if ($resultado){

            echo json_encode(['status'=>'success']);

        }else{

            echo json_encode(['status'=>'error']);

        }

    }

    public function IniciarSesion(){

        $Usuarios = new Usuarios();

        $Usuario = $_POST['Usuario'] ?? '';
        $Contra = $_POST['Contra'] ?? '';

        if($resultado = $Usuarios->IniciarSesion($Usuario, $Contra)){

            echo json_encode(['status'=>'success']);
        }else{

            echo json_encode(['status'=>'error']);
        }


    }

    public function EditarDatoPerfil(){

        $Usuarios = new Usuarios();

        $DatoNuevo = $_POST['DatoNuevo'] ?? '' ;
        $TipoDato = $_GET['tipo'] ?? '';

        if($Usuarios->EditarDatoPerfil($DatoNuevo, $TipoDato)){

            echo json_encode(['status'=>'success']);
        }else{

            echo json_encode(['status'=>'error']);
        }
    }

    public function EliminarCuenta(){

        $Usuarios = new Usuarios();

        $resultado = $Usuarios->eliminarCuenta();

        if($resultado){

            echo json_encode(['status'=>'success']);

        }else{

            echo json_encode(['status'=>'error']);

        }
    }

}



?>