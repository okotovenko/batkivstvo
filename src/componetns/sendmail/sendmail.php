<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	/*
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'user@example.com';                     //SMTP username
	$mail->Password   = 'secret';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	*/

	//От кого письмо
	$mail->setFrom('support@din.zp.ua', 'support@din.zp.ua'); // Вказати E-mail домену (звідки буде перенаправлення)
	//Кому отправить
	$mail->addAddress('oakotovenko@ukr.net'); // Вказати E-mail для отримання литсів
	//Тема письма
	$mail->Subject = 'Тема листа';

	//Тело письма
	$body = '<h1>Тіло листа</h1>';
	
	if(trim(!empty($_POST['name']))){
		$body.="<p><strong>Ім'я:  </strong>" .$_POST['name'].'</p>';
	}
	
	if(trim(!empty($_POST['tel']))){
		$body.='<p><strong>Контактний телефон:  </strong>' .$_POST['tel'].'</p>'; // на ukr.net не приходить, щоб приходило треба input type="text"
	}

	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>Почтова скринька:  </strong>' .$_POST['email'].'</p>';
	}	
	
	//Прикріпити файли
    for ($ct = 0, $ctMax = count($_FILES['userfile']['tmp_name']); $ct < $ctMax; $ct++) {
        //Extract an extension from the provided filename
        $ext = PHPMailer::mb_pathinfo($_FILES['userfile']['name'][$ct], PATHINFO_EXTENSION);
        //Define a safe location to move the uploaded file to, preserving the extension
        $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['userfile']['name'][$ct])) . '.' . $ext;
        $filename = $_FILES['userfile']['name'][$ct];
        if (move_uploaded_file($_FILES['userfile']['tmp_name'][$ct], $uploadfile)) {
            if (!$mail->addAttachment($uploadfile, $filename)) {
                $message .= 'Failed to attach file ' . $filename;
            }
        } else {
            $message .= 'Failed to move file to ' . $uploadfile;
        }
    }
	

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Помилка';
	} else {
		$message = 'Дані відправлено!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);

?>