<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

    if (isset($_POST["name"]) && $_POST["name"] != null && isset($_POST["email"]) && $_POST["email"] != null
        && isset($_POST["message"]) && $_POST["message"] != null) {

    
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->isSMTP();                                            
            $mail->Host       = 'premium60.web-hosting.com';                    
            $mail->SMTPAuth   = true;                                   
            $mail->Username   = 'form@connermurphy.net';                     
            $mail->Password   = 'gNHku&B4*zOD';                               
            $mail->SMTPSecure = "ssl";                                  
            $mail->Port       = 465;                                    

            //Recipients
            $mail->setFrom("form@connermurphy.net", $_POST["name"]);
            $mail->addAddress('enquiry@connermurphy.net', 'Conner Murphy');     
            $mail->addReplyTo($_POST["email"], $_POST["name"]);

            $mail->isHTML(false);                                  
            $mail->Subject = "New Contact Form Enquiry";
            $mail->Body    = $_POST["message"];

            $mail->send();
            echo '1';

        } catch (Exception $e) {
            echo $mail->ErrorInfo;
        }
    } else {

        header("Location: /");

    }

?>