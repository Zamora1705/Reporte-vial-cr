<?php

require_once '../controller/UsuariosController.php';

$usuarios = new UsuariosController();

$action = $_GET['action'] ?? '';

switch ($action){

   case 'crearUsuario':
    $usuarios->create();
    break;

}



?>