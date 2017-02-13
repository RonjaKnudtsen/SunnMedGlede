<?php 
iconv_set_encoding("internal_encoding", "UTF-8");
if(isset($_POST['submit'])){
    $from = strip_tags($_POST['email']);
    $to = "ronjark@ifi.uio.no";
    //rubina@sunnmedglede.no
    $toheaders = "From: " . $from . "\r\n";
    $toheaders .= "Reply-To: " . $from . "\r\n";
    $toheaders .= "Content-type: text/html\r\n";
    //$toheaders .= "charset=UTF-8\nContent-Transfer-Encoding: 8bit\n";

    $fromHeaders = "From: " . $to . "\r\n";
    $fromHeaders .= "Reply-To: " . $to . "\r\n";
    $fromHeaders .= "Content-type: text/html\r\n";
    //$fromHeaders .= "charset=UTF-8\nContent-Transfer-Encoding: 8bit\n";
    


    $message = "<p>Ønsket program: " . strip_tags($_POST['program']) . "</p>";
    $message .= "<p>Navn: " . strip_tags($_POST['name']) . "</p>";
    $message .= "<p>Alder: " . strip_tags($_POST['age']) . "</p>";
    $message .= "<p>Bosted(by): " . strip_tags($_POST['location']) . "</p>";
    $message .= "<p>Motivasjon (1-10): " . strip_tags($_POST['motivation']) . "</p>";

    if($_POST['moreinfo']){
         $message .= "<p>Noe du vil dele? (1-10): " . strip_tags($_POST['moreinfo']) . "</p>";
     };
   

    $toBody = "<h2>Sunn med glede - Ny kunde</h2>";
    $toBody .= $message;

    $fromBody = "<h2>Sunn med glede - Kvittering for innsending av skjema</h2>";
    $fromBody .="<h3>Skjemaet under er sendt til ernæringsfysiolog og personlig trener Rubina Olsen. Hun vil kontakte deg snarest. Lykke til!</h3> <hr>";
    $fromBody .= $message;

/*
    $fromHeaders = "From: ". $from ."\n";
    $fromHeaders .= "Reply-To: ".$from . "\n";
    $fromHeaders .= "CC: " . $to . "\n";
    $fromHeaders .= "MIME-Version: 1.0\n ";
    $fromHeaders .= "Content-type: text/html; charset=UTF-8\n";



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

*/

    $subject = "♥ Sunn med glede: Ny kunde: ".$_POST['name'] . " for: " . $_POST['program'];
    $toSubject = '=?UTF-8?B?'.base64_encode($subject).'?=';

    $subject2 = "♥ Sunn med glede: kvittering";
    $fromSubject = '=?UTF-8?B?'.base64_encode($subject2).'?=';


    $response = mail($to, $toSubject, utf8_decode($message), $toHeaders);
   $response2 =  mail($from, $fromSubject, utf8_decode($message), $fromHeaders);

 // mail($to, $fromSubject, $message, $toHeaders);
 // mail($from, $fromSubject, $message, $fromHeaders);


    echo $response;
    echo $response2;
    }

?>