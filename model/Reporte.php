<?php


require_once '../config/XEPDB1.php';


class Reporte{

    private $DB;

    public function __construct(){

        $this->DB = DataBase :: connect();
    }

    public function create($Longitud, $Latitud, $Tipodano, $Categoria, $Provincia, $Canton, $Distrito, $Calle){

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

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, r.Reporte_ID, r.Usuario_FK, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID";

        $smtp = oci_parse($this->DB, $query);

        oci_execute($smtp);

        $listado = [];

        while($row = oci_fetch_assoc($smtp)){

            $filaLimpia = [];

            foreach($row as $key => $value){

                $filaLimpia[$key] = mb_convert_encoding($value, 'UTF-8', 'Windows-1252');
            }

            $listado[] = $filaLimpia;

        }

        return $listado;
    }

    public function obtenerReporteByID($idReporte){

        $query = "SELECT t.Nombre_dano, c.Nombre_categoria, r.Fecha, r.Longitud, r.Latitud, r.Provincia_nom, r.Canton_nom, r.Distrito_nom
        FROM Reporte r INNER JOIN Categoria c ON r.Categoria_FK = c.Categoria_ID INNER JOIN Tipo_dano t ON r.Tipo_Dano_FK = t.Dano_ID WHERE r.Reporte_ID = :idReporte";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':idReporte', $idReporte);

        oci_execute($smtp);

        $row = oci_fetch_assoc($smtp);

        return $row;
    }
}



?>