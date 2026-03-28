<?php

require_once '../controller/UsuariosController.php';

$usuarios = new UsuariosController();

$action = $_GET['action'] ?? '';

switch ($action){

   case 'crearUsuario':
    $usuarios->create();
    break;
    
   case 'buscarCorreo':
    $usuarios->buscarUsuario();
    break;

   case 'IniciarSesion':
    $usuarios->IniciarSesion();
    break;

   case 'EditarDatoPerfil':
    $usuarios->EditarDatoPerfil();
    break; 

   case 'EliminarCuenta':
    $usuarios->EliminarCuenta();
    break; 

}



?>