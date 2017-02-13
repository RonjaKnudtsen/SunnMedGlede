<?php 
echo "Send mail.php";
if(isset($_POST['submit'])){

    $from = strip_tags($_POST['email']);
    $to = "ronjark@ifi.uio.no";
    //rubina@sunnmedglede.no

    $toHeaders = "From: " . $from . "\r\n";
    $toHeaders .= "Reply-To: " . $from . "\r\n";
   // $toHeaders .= "CC: " . $to . "\n";
    //$toHeaders .= "MIME-Version: 1.0\n ";
    $toHeaders .= "Content-type: text/html\r\n";

    echo "</br>to headers: " . $toHeaders . "</br>";


    $fromHeaders = "From: ". $from ."\n";
    $fromHeaders .= "Reply-To: ".$from . "\n";
    $fromHeaders .= "CC: " . $to . "\n";
    $fromHeaders .= "MIME-Version: 1.0\n ";
    $fromHeaders .= "Content-type: text/html; charset=UTF-8\n";

    echo "</br>from headers: " . $fromHeaders . "</br>";

    $message = "<p>Ønsket program: " . strip_tags($_POST['program']) . "</p>";
    $message .= "<p>Navn: " . strip_tags($_POST['name']) . "</p>";
    $message .= "<p>Alder: " . strip_tags($_POST['age']) . "</p>";
    $message .= "<p>Bosted(by): " . strip_tags($_POST['location']) . "</p>";
    $message .= "<p>Motivasjon (1-10): " . strip_tags($_POST['motivation']) . "</p>";
    $message .= "<p>Noe du vil dele? (1-10): " . strip_tags($_POST['moreinfo']) . "</p>";
    

    $toBody = "<h2>Sunn med glede - Ny kunde</h2>";
    $toBody .= $message;

    $fromBody = "<h2>Kvittering for innsending av skjema</h2>";
    $fromBody .="<p>Skjemaet under er sendt til ernæringsfysiolog og personlig trener Rubina Olsen. Hun vil kontakte deg snarest. Lykke til!</p> <hr>";
    $fromBody .= $message;


    
    echo "TOBODY:";
    echo $toBody;
    echo "FROMBODY:";
    echo $fromBody;
    echo "<hr>";

    $toSubject = "SUNN MED GLEDE: Ny kunde: ".$_POST['name'] . " for: " . $_POST['program'];
    $fromSubject = "SUNN MED GLEDE: kvittering for innsending av skjema";


  $response = mail($to, $toSubject, $toBody, $toHeaders);
  //mail($from, $fromSubject, $fromBody, $fromHeaders);


echo $response;
 //echo "Epost er sendt til ernæringsfysiolog og personlig trener Rubina Olsen. Hun vil kontakte deg snarest. Lykke til " . $_POST['name'] . "!";
//return "Epost er sendt til ernæringsfysiolog og personlig trener Rubina Olsen. Hun vil kontakte deg snarest. Lykke til " . $_POST['name'] . "!";
  //  $subject2 = "Hei, "+ $_POST['name']+ " "


    /*$message .= "<p>" . $_POST['name'] . " (" . $_POST['age'] . ")" . ". Som bor i: " . $_POST['location'] . ". Ønsker å registrere seg på " . $_POST['program'] . ".</br> Motivasjon på en skala fra 1-10: " . $_POST['motivation'] . ".</br> Noe du vil dele?: " . $_POST['moreinfo'] . " ";*/
    
   // $headers2 = "From:" . $to;


    

  //  mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender

   
    // You can also use header('Location: thank_you.php'); to redirect to another page.

    }

?>