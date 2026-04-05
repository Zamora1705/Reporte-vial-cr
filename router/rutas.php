<?php

require_once '../controller/UsuariosController.php';
require_once '../controller/TipoDanoController.php';
require_once '../controller/CategoriaController.php';
require_once '../controller/ProvinciaController.php';
require_once '../controller/CantonController.php';
require_once '../controller/DistritoController.php';
require_once '../controller/CalleController.php';
require_once '../controller/ReporteController.php';
require_once '../controller/EntidadController.php';


$usuarios = new UsuariosController();
$TipoDano = new TipoDanoController();
$Categoria = new CategoriaController();
$Provincia = new ProvinciaController();
$Canton = new CantonController();
$Distrito = new DistritoController();
$Calle = new CalleController();
$Reporte = new ReporteController();
$Entidad = new EntidadController();

$action = $_GET['action'] ?? '';

switch ($action){

   case 'crearUsuario':
    $usuarios->create();
    break;
    
   case 'buscarUsuarioRegistro':
    $usuarios->buscarUsuarioRegistro();
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

   case 'obtenerReporteByID':
   $Reporte->obtenerReporteByID();
   break; 

   case 'editarReporte':
   $Reporte->editarReporte();
   break;

   case 'eliminarReporte':
      $Reporte->eliminarReporte();
      break;

   case 'filtrarReporte':
      $Reporte->filtrarReporte();
      break;
      
   case 'filtrarReporteCategoria':
      $Reporte->filtrarReporteCategoria();
      break;  
      
   case 'filtrarReporteProvincia':
      $Reporte->filtrarReporteProvincia();
      break;  
      
   case 'filtrarReporteTipoDanoXCategoria':
      $Reporte->filtrarReporteTipoDanoXCategoria();
      break;

   case 'filtrarReporteTipoDanoXprovincia':
      $Reporte->filtrarReporteTipoDanoXprovincia();
      break;      

   case 'filtrarReporteCategoriaXprovincia':
      $Reporte->filtrarReporteCategoriaXprovincia();
      break;   

   case 'filtrarReporteCategoriaXprovinciaXtipodano':
      $Reporte->filtrarReporteCategoriaXprovinciaXtipodano();
      break;
      
   case 'filtrarReporteUsuario':
      $Reporte->filtrarReporteUsuario();
      break;   

   case 'listadoResponsables':
      $Entidad->listadoResponsables();
      break; 
      
   case 'asigarResponsable':
      $Entidad->asigarResponsable();
      break;   


 

}



?>