<?php

require_once '../controller/UsuariosController.php';
require_once '../controller/TipoDanoController.php';
require_once '../controller/CategoriaController.php';
require_once '../controller/ProvinciaController.php';
require_once '../controller/CantonController.php';
require_once '../controller/DistritoController.php';
require_once '../controller/CalleController.php';
require_once '../controller/ReporteController.php';


$usuarios = new UsuariosController();
$TipoDano = new TipoDanoController();
$Categoria = new CategoriaController();
$Provincia = new ProvinciaController();
$Canton = new CantonController();
$Distrito = new DistritoController();
$Calle = new CalleController();
$Reporte = new ReporteController();

$action = $_GET['action'] ?? '';

switch ($action){

   case 'crearUsuario':
    $usuarios->create();
    break;
    
   case 'buscarUsuario':
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

   case 'obtenerCategorias':
    $Categoria->listado();
    break; 

   case 'obtenerProvincias':
    $Provincia->listado();
    break; 

   case 'obtenerCantones':
    $Canton->listado();
    break; 

   case 'obtenerDistritos': 
    $Distrito->listado();
    break; 

   case 'obtenerCalles':
    $Calle->listado();
    break; 

   case 'crearReporte' :
    $Reporte->create();
    break;

   case 'obtenerReportes':
    $Reporte->listado();
    break; 
 

}



?>