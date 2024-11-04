<?php
global $db;
require_once 'mysqlConnect.php';
require_once 'helper.php'; // pour accéder aux fonctions sendMessage et sendError

if ($_SESSION['user_role']=='administrateur') {
    $stmt = $db->prepare('SELECT firstName FROM Users');  // Prépare la requête SQL avec un paramètre
    $stmt->execute();  // Exécute la requête avec le paramètre
    $firstName = $stmt->fetchAll(PDO::FETCH_ASSOC);  // Récupère tous les utilisateurs

    if($firstName) {
        sendMessage($firstName); // envoie les prénoms des utilisateurs sous forme de JSON
    } else {
        sendError('Aucun utilisateur trouvé.');
    }

}else{
    sendError('Vous n êtes pas administrateur');
}
?>
