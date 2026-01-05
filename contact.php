<?php
// 1. Set the email address where you want to receive messages
$receiving_email_address = 'amanathmaq@gmail.com'; // Replace with your real email

// 2. Check if the form was submitted
if ($_POST) {
    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
    $subject = strip_tags($_POST['subject']);
    $message = strip_tags($_POST['message']);

    // 3. Construct the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // 4. Set email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // 5. Send the email
    if (mail($receiving_email_address, "Portfolio Contact: $subject", $email_content, $headers)) {
        echo "OK"; // This tells your JavaScript the message was sent successfully
    } else {
        http_response_code(500);
        echo "Error: Could not send email.";
    }
} else {
    echo "Invalid Request";
}
