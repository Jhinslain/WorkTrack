<?php
require_once 'helper.php'; // pour accéder aux fonctions sendMessage et sendError
require_once 'mysqlConnect.php'; // pour accéder à la base de données

global $db;

if(!empty($_POST)) {
    $dateid = intval($_POST['date_id']);


    $stmt = $db->prepare("DELETE FROM schedules WHERE id = :dateid");
    $stmt->execute([':dateid' => $dateid]);

// Exécuter la requête et vérifier si elle a réussi
    if ($stmt->rowCount() > 0) {
        sendMessage('');
    } else {
        sendError('An error occurred while deleting the schedule.');
    }
}
else {
    sendError('Invalid request: no data received.' );
}
?>
