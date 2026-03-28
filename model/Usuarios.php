<?php

require_once '../config/XEPDB1.php';

class Usuarios{
    private $DB;

    public function __construct(){

        $this->DB = DataBase ::connect();

    }

    public function create($Usuario, $Cedula, $Correo, $Contrasena){

        $sql = "INSERT INTO Usuarios (Nombre, Correo, Contrasena, Cedula)
        VALUES (:Usuario, :Correo, :Contrasena, :Cedula)";
        $commit = "COMMIT";
        $commitSmtp = oci_parse($this->DB, $commit);

        $smtp = oci_parse($this->DB, $sql);

        oci_bind_by_name($smtp, ':Usuario', $Usuario);
        oci_bind_by_name($smtp, ':Correo', $Correo);
        oci_bind_by_name($smtp, ':Contrasena', $Contrasena);
        oci_bind_by_name($smtp, ':Cedula', $Cedula);

        $result = oci_execute($smtp);
        oci_execute($commitSmtp);
        return $result;
        
    }

    public function BuscarUsuario($Usuario){

        $query = "SELECT COUNT(*) AS Total FROM Usuarios WHERE Nombre = :Usuario";

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':Usuario', $Usuario);

        $result = oci_execute($smtp);

        if($result){

            $row = oci_fetch_assoc($smtp);
            return $row['TOTAL']>0;

        }else{

            return false;

        }
    }

    public function IniciarSesion($User, $Password){

        $query = "SELECT * FROM Usuarios WHERE Nombre = :Usuario";
        
        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':Usuario', $User);

        $resultado = oci_execute($smtp);

            $row = oci_fetch_assoc($smtp);

            if($row){

            $contra = $row['CONTRASENA'];

            if(password_verify($Password, $contra)){

                SESSION_START();

                $_SESSION['Usuario'] = $row['NOMBRE'];
                $_SESSION['Correo'] = $row['CORREO'];
                $_SESSION['Cedula'] = $row['CEDULA'];
            

                return true;

            }else{

               return false;
            }



        }else{

           return false;
        }
       
    }

    public function EditarDatoPerfil($DatoNuevo, $TipoDato){

        $Cedula= $_SESSION['Cedula'];

        $query = "UPDATE Usuarios SET $TipoDato = :DatoNuevo WHERE Cedula = :Cedula";
        $queryCommit='COMMIT';
        $commitSmtp = oci_parse($this->DB, $queryCommit);

        $smtp= oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':DatoNuevo', $DatoNuevo);
        oci_bind_by_name($smtp, ':Cedula', $Cedula);

        $resultado = oci_execute($smtp);
        oci_execute($commitSmtp);

        if($TipoDato == 'Nombre'){

            $_SESSION['Usuario'] = $DatoNuevo;

        }else if ($TipoDato == 'Correo'){

            $_SESSION['Correo'] = $DatoNuevo;

        }else{

            $_SESSION['Cedula'] = $DatoNuevo;

        }


        return $resultado;

    }

    public function eliminarCuenta(){

        $Cedula = $_SESSION['Cedula'];

        $query = "DELETE FROM Usuarios WHERE Cedula = :Cedula";

        $queryCommit = 'COMMIT';

        $smtp = oci_parse($this->DB, $query);

        oci_bind_by_name($smtp, ':Cedula', $Cedula);

        $commitQuery = oci_parse($this->DB, $queryCommit);

        $result = oci_execute($smtp);

        oci_execute($commitQuery);

        if($result){

            return true;
            
        }else{

            return false;
        }


    }
}

?>