<?php

require_once '../controller/UsuariosController.php';

$usuarios = new UsuariosController();

$action = $_POST['action'] ?? '';

switch ($action){

   case 'crearUsuario':
    $usuarios->create();
    break;

}



?>