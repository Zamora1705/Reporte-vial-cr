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
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'reportevialcr@gmail.com';                     //SMTP username
    $mail->Password   = 'yhbjvuoqfzwlgnja';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('reportevialcr@gmail.com', 'Reporte Vial CR');
    $mail->addAddress('zamorasenastian@gmail.com');     //Add a recipient

    //Attachments
 
    

    $url='http://localhost:8000/main/manageaccount/eliminarCuenta.php';
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Eliminación de cuenta';
    $mail->Body    = "<div style='width:500px;height:auto;background:#1A3A5C;color:#F4F6F8;border-radius:16px;border:3px solid #2E6DA4;padding:20px;' ><h2>Estimado Sad tavo, </h2>
    

    

    <p style='text-aligh:center;' >Por este medio se le otorga el acceso a la fase final de eliminación de su cuenta es una verdadera lastima perder su presencia
    en los reportes viales de CR</p>

    <p style='text-aligh:center;' >Le deseamos el mayor de los exitos !</p>

    <button style='width:100%;color:white;background-color:#2E6DA4;text-align:center;height:60px;font-size:15px;text-decoration:none;'><a href='$url' style='text-decoration:none;color:white;' ><strong>Eliminar cuenta</strong></a></button>
    
    </div>";

    


    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}