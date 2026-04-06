<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader (created by composer, not included with PHPMailer)
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'reportevialcr@gmail.com';                     //SMTP username
    $mail->Password   = 'yhbjvuoqfzwlgnja';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $correo = $_POST['correo'] ?? '';
    $fecha = $_POST['fecha'] ?? '';
    $usuario = $_POST['usuario'] ?? '';

    

    $mail->setFrom('reportevialcr@gmail.com', 'Reporte Vial CR');
    $mail->addAddress($correo);     //Add a recipient

    //Attachments
 
    

    $url='http://localhost:8000/main/manageaccount/eliminarCuenta.php';
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Informe de reporte';
    $mail->Body    = "<div style='width:500px;height:auto;background:#1A3A5C;color:#F4F6F8;border-radius:16px;border:3px solid #2E6DA4;padding:20px;' ><h2>Estimado $usuario, </h2>
    

    

    <p style='text-align:center;' >Por este medio se le notifica que el reporte que usted notifico el ".$fecha." fue satisfactoriamente reparado</p>

    <p style='text-align:center;font-size:60px;' ><i class='fa-solid fa-face-laugh-beam'></i></p>

    
    </div>";

    


   if( $mail->send()){

      echo json_encode(['status'=>'success']);
   }else{

      echo json_encode(['status'=>'error']);
   }
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

