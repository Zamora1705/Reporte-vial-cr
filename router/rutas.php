<?php

require_once '../controller/UsuariosController.php';
require_once '../controller/TipoDanoController.php';

$usuarios = new UsuariosController();
$TipoDano = new TipoDanoController();

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


   case 'validarContrasenaActual':
    $usuarios->ValidarContrasena();
    break;

   case 'cambiarContrasena':
    $usuarios->CambiarContrasena();
    break; 

   case 'obtenerTipoDanos':
    $TipoDano->listado();
    break; 

}



?>