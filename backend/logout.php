<?php
require_once 'mysqlConnect.php';
require_once 'helper.php'; // inclus le fichier helper.php
require_once 'config.php'; // inclus le fichier de configuration de la base de données


session_start();
session_unset();
session_destroy();
//sendMessage(''); // Pour renvoyer la réponse JSON attendue par le frontend
exit();
?>

