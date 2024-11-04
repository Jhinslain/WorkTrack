<?php

global $db;
require_once 'mysqlConnect.php';
require_once 'helper.php'; // pour accéder aux fonctions sendMessage et sendError

$stmt = $db->prepare('SELECT * FROM Users');  // Prépare la requête SQL avec un paramètre
$stmt->execute();  // Exécute la requête avec le paramètre
$firstName = $stmt->fetchAll(PDO::FETCH_ASSOC);  // Récupère tous les utilisateurs


?>