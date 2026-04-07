<?php


require_once '../config/XEPDB1.php';


class Reporte
{

    private $DB;

    public function __construct()
    {

        $this->DB = DataBase::connect();
    }

    public function create($Longitud, $Latitud, $Tipodano, $Categoria, $Provincia, $Canton, $Distrito, $Calle)
    {

        session_start();

        $Usuario = $_SESSION['Cedula'];

        $query = "INSERT INTO Reporte (Tipo_Dano_FK, Categoria_FK, Usuario_FK, Calle_FK, Longitud, Latitud, Provincia_nom, Canton_nom, Distrito_nom) VALUES (:Tipodano, :Categoria, :Usuario, :Calle, :Longitud, :Latitud,
        :Provincia, :Canton, :Distrito)";

        $queryCommit = 'COMMIT';

        $smtp = oci_parse($this->DB, $query);
        $smtpCommit = oci_parse($this->DB, $queryCommit);

        oci_bind_by_name($smtp, ':Longitud', $Longitud);
        oci_bind_by_name($smtp, ':Latitud', $Latitud);
        oci_bind_by_name($smtp, ':Tipodano', $Tipodano);
        oci_bind_by_name($smtp, ':Categoria', $Categoria);
        oci_bind_by_name($smtp, ':Usuario', $Usuario);
        oci_bind_by_name($smtp, ':Provincia', $Provincia);
        oci_bind_by_name($smtp, ':Canton', $Canton);
        oci_bind_by_name($smtp, ':Distrito', $Distrito);
        oci_bind_by_name($smtp, ':Calle', $Calle);



        $result = oci_execute($smtp);
        oci_execute($smtpCommit);

        return $result;
    }

    public function listado(){

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, 
                  r.Distrito_nom, rd.Reporte_FK FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
                  FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID";

        $smtp = oci_parse($this->DB, $query);

        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

               if($value != null){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

               }
            }

            $listado[] = $filaLimpia;

        }

        return $listado;
    }

    public function obtenerReporteByID($idReporte){

        $query = "SELECT t.Nombre_dano, t.Dano_ID , c.Categoria_ID, c.Nombre_categoria, r.Fecha, r.Reporte_ID, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom, r.Calle_FK, a.Nombre_calle
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID INNER JOIN Calle_Report a 
        ON r.Calle_FK = a.Calle_ID WHERE r.Reporte_ID = :idReporte";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':idReporte', $idReporte);

        oci_execute($smtp);

        $row = oci_fetch_assoc($smtp);

        return $row;
    }

    public function editarReporte($Tipodano, $Categoria, $Provincia, $Canton, $Distrito, $Calle, $idReporte)
    {



        $query = "UPDATE Reporte SET Tipo_Dano_FK = :Tipodano, Categoria_FK = :Categoria, Calle_FK = :Calle, 
          Provincia_nom = :Provincia, Canton_nom = :Canton, Distrito_nom = :Distrito WHERE Reporte_ID = :idReporte";
        $queryCommit = "COMMIT";

        $smtp = oci_parse($this->DB, $query);
        $smtpCommit = oci_parse($this->DB, $queryCommit);


        oci_bind_by_name($smtp, ':Tipodano', $Tipodano);
        oci_bind_by_name($smtp, ':Categoria', $Categoria);
        oci_bind_by_name($smtp, ':Provincia', $Provincia);
        oci_bind_by_name($smtp, ':Canton', $Canton);
        oci_bind_by_name($smtp, ':Distrito', $Distrito);
        oci_bind_by_name($smtp, ':Calle', $Calle);
        oci_bind_by_name($smtp, ':idReporte', $idReporte);

        $result = oci_execute($smtp);
        oci_execute($smtpCommit);

        return $result;

    }

    public function eliminarReporte($idreporte)
    {

        $query = "DELETE FROM Reporte WHERE Reporte_ID = :idreporte";
        $queryCommit = "COMMIT";

        $smtp = oci_parse($this->DB, $query);
        $smtpCommit = oci_parse($this->DB, $queryCommit);

        oci_bind_by_name($smtp, ':idreporte', $idreporte);

        $result = oci_execute($smtp);
        oci_execute($smtpCommit);

        return $result;

    }

    public function filtrarReporte($Tipodano)
    {

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, rd.Reporte_FK, r.Fecha, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
        FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Tipo_Dano_FK = :Tipodano";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':Tipodano', $Tipodano);

        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

            if($value != null){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

              }
            }

            $listado[] = $filaLimpia;


        }

        return $listado;

    }

    public function filtrarReporteCategoria($categoria)
    {

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, rd.Reporte_FK, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
        FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Categoria_FK = :Categoria";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':Categoria', $categoria);

        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

            if($value != null){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

              }

            }

            $listado[] = $filaLimpia;


        }

        return $listado;

    }

    public function filtrarReporteProvincia($provincia)
    {

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, rd.Reporte_FK, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
        FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Provincia_nom = :Provincia";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':Provincia', $provincia);

        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

                if($value !=null ){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

                }
            }

            $listado[] = $filaLimpia;


        }

        return $listado;

    }

    public function filtrarReporteTipoDanoXCategoria($tipodano, $categoria)
    {

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, rd.Reporte_FK, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
        FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Tipo_Dano_FK = :tipodano and r.Categoria_FK = :categoria";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':tipodano', $tipodano);
        oci_bind_by_name($smtp, ':categoria', $categoria);

        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

                if($value != null){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

                }

            }

            $listado[] = $filaLimpia;


        }

        return $listado;

    }

    public function filtrarReporteTipoDanoXprovincia($tipodano, $provincia)
    {

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, rd.Reporte_FK, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
        FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Tipo_Dano_FK = :tipodano and r.Provincia_nom = :provincia";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':tipodano', $tipodano);
        oci_bind_by_name($smtp, ':provincia', $provincia);

        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

                if($value != null){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

                }
            }

            $listado[] = $filaLimpia;


        }

        return $listado;

    }

    public function filtrarReporteCategoriaXprovincia($categoria, $provincia)
    {

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, rd.Reporte_FK, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
        FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Categoria_FK = :categoria and r.Provincia_nom = :provincia";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':categoria', $categoria);
        oci_bind_by_name($smtp, ':provincia', $provincia);

        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

                if($value != null){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

                }
            }

            $listado[] = $filaLimpia;


        }

        return $listado;


    }

    public function filtrarReporteCategoriaXprovinciaXtipodano($tipodano, $categoria, $provincia)
    {

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, r.Reporte_ID, r.Usuario_FK, rd.Reporte_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
        FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Categoria_FK = :categoria and r.Provincia_nom = :provincia and r.Tipo_Dano_FK = :tipodano";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':categoria', $categoria);
        oci_bind_by_name($smtp, ':provincia', $provincia);
        oci_bind_by_name($smtp, ':tipodano', $tipodano);

        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

                if($value != null){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

                }
            }

            $listado[] = $filaLimpia;


        }

        return $listado;


    }

    public function filtrarReporteUsuario($usuario)
    {

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, rd.Reporte_FK, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
        FULL OUTER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Usuario_FK = :usuario ";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':usuario', $usuario);


        oci_execute($smtp);

        $listado = [];

        while ($row = oci_fetch_assoc($smtp)) {

            $filaLimpia = [];

            foreach ($row as $key => $value) {

                if($value != null){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

                }
            }

            $listado[] = $filaLimpia;


        }

        return $listado;



    }

    public function listadoReportesAsignados($rol){

       $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
       FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID 
       FULL OUTER JOIN Reporte_designado rd ON r.Reporte_ID = rd.Reporte_FK WHERE rd.Entidad_Responsable = :rolEntidad";

       $smtp=oci_parse($this->DB, $query);

       oci_bind_by_name($smtp, ':rolEntidad', $rol);

       oci_execute($smtp);

       $listado = [];

       while($row = oci_fetch_assoc($smtp)){

           $filaLimpia = [];

           foreach($row as $key => $value){

               $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');
           }

           $listado[]=$filaLimpia;

       }

       return $listado;

    }

    public function finalizarReporte($idreporte){

       $query = "SELECT r.Fecha, u.Correo, u.Nombre, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
       , r.Usuario_FK, c.Nombre_categoria, t.Nombre_dano, cl.Nombre_calle, rd.Entidad_Responsable FROM Reporte r 
       INNER JOIN Usuarios u ON r.Usuario_FK = u.Cedula INNER JOIN Calle_Report cl ON r.Calle_FK = cl.Calle_ID 
       INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID
       INNER JOIN Reporte_designado rd ON rd.Reporte_FK = r.Reporte_ID WHERE r.Reporte_ID = :idreporte";

       $smtp=oci_parse($this->DB, $query);

       oci_bind_by_name($smtp, ':idreporte', $idreporte);

       oci_execute($smtp);

       $datos = [];

       while($row = oci_fetch_assoc($smtp)){

           $filaLimpia = [];

           foreach($row as $key => $value){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');

           }

           $datos[] = $filaLimpia;


       }

       return $datos;
    
    }

    public function HistorialReporte($idreporte, $tipodano, $categoria, $provincia, $canton, $distrito, $calle, $usuario, $fecha){

     $query = "INSERT INTO Historial_reporte VALUES (:idreporte, :tipodano, :categoria, :provincia, :canton, :distrito, :calle, :fecha, :usuario)";
     $queryCommit = 'COMMIT';
     $smtp = oci_parse($this->DB, $query);
     $smtpCommit = oci_parse($this->DB, $queryCommit);

     oci_bind_by_name($smtp, ':idreporte', $idreporte);
     oci_bind_by_name($smtp, ':tipodano', $tipodano);
     oci_bind_by_name($smtp, ':categoria', $categoria);
     oci_bind_by_name($smtp, ':provincia', $provincia);
     oci_bind_by_name($smtp, ':canton', $canton);
     oci_bind_by_name($smtp, ':distrito', $distrito);
     oci_bind_by_name($smtp, ':calle', $calle);
     oci_bind_by_name($smtp, ':fecha', $fecha);
     oci_bind_by_name($smtp, ':usuario', $usuario);

     $result = oci_execute($smtp);
     oci_execute($smtpCommit);

     if (!$result) {
    $e = oci_error($smtp);
    file_put_contents('error_log.txt', $e['message']);
}else{
     return $result;

}




             

    }
}



?>