<?php
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$residing_country = $_POST['residing country'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$email_from = 'medonik.officiel@gmail.com';

$email_subject = 'New Form Submission';

$email_body = "User Name: $name.\n".
                "User Email: $visitor_email.\n".
                 "Residing Country: $residing_country.\n".
                 "Subject: $subject.\n";

$to = 'kravetsmarkian@icloud.com';

$headers = "From: $email_from \r\n";

$headers = "Reply-to: $visitor_email \r\n";

mail($to, $email_subject, $email_body, $headers);

header('Location: contact_us.html');


?>