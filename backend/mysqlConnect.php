<?php
// fichier mysqlConnect.php
require_once 'config.php';  // Importe les détails de la connexion à la base de données

global $db;


try {
    $db = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8", DB_USER, DB_PASSWORD);
    // configure PDO pour lancer une exception lorsque des erreurs se produisent
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
?>
