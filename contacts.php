<?php

$captcha;
if(isset($_POST['token'])){
	$captcha=$_POST['token'];
}

$secretKey = "6LeXL70aAAAAAJxSaswCF6itNIhufG5TAPPyJL7o";
$ip = $_SERVER['REMOTE_ADDR'];

// post request to server

$url =  'https://www.google.com/recaptcha/api/siteverify?secret=' . $secretKey .  '&response=' . $_POST['token'];
$response = file_get_contents($url);
$responseKeys = json_decode($response,true);
header('Content-type: application/json');
if($responseKeys["success"] && $responseKeys["score"] >= 0.5) {
	echo json_encode(array('success' => 'true', 'om_score' => $responseKeys["score"], 'token' => $_POST['token']));
} else {
	echo json_encode(array('success' => 'false', 'om_score' => $responseKeys["score"], 'token' => $_POST['token']));
}

if (isset ($_POST['email'])) {
 
  
 
  $to = "hudprokat@gmail.com"; // поменять на свой электронный адрес
  $from = $_POST['email'];
  $tel = $_POST['to_tel'];
  $position = $_POST['position'];
  $subject = "Сайт Художественного проката металла";
  $message = "Позиция: ".$position."\nИмя: ".$_POST['name']."\nEmail: ".$from."\nТелефон: ".$tel."\nСообщение: ".$_POST['message'];
  $boundary = md5(date('r', time()));
  $filesize = '';
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "From: " . $from . "\r\n";
  $headers .= "Reply-To: " . $from . "\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
  $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"

--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit

$message";
  for($i=0;$i<count($_FILES['file']['name']);$i++) {
     if(is_uploaded_file($_FILES['file']['tmp_name'][$i])) {
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['file']['tmp_name'][$i])));
         $filename = $_FILES['file']['name'][$i];
         $filetype = $_FILES['file']['type'][$i];
         $filesize += $_FILES['file']['size'][$i];
         $message.="

--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"

$attachment";
     }
   }
   $message.="
--$boundary--";

  if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
    mail($to, $subject, $message, $headers);
    
  } else {
    
  }
  
}


?>