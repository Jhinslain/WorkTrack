<?php
require_once 'helper.php'; // pour accéder aux fonctions sendMessage et sendError
require_once 'mysqlConnect.php'; // pour accéder à la base de données

global $db;

if(!empty($_POST)) {
    $dateid = intval($_POST['date_id']);

    // Récupérer l'état actuel de la validation
    $stmt = $db->prepare("SELECT validated FROM schedules WHERE id=:dateid");
    $stmt->execute([':dateid' => $dateid]);

    // Vérifier si l'horaire existe
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $validated = $row['validated'];

        // Inverser l'état de la validation
        $newValidated = !$validated;

        // Mettre à jour l'horaire avec le nouvel état
        $stmt = $db->prepare("UPDATE schedules SET validated=:newValidated WHERE id=:dateid");
        $stmt->execute([':newValidated' => $newValidated, ':dateid' => $dateid]);

        // Vérifier si la mise à jour a réussi
        if ($stmt->rowCount() > 0) {
            sendMessage('');
        } else {
            sendError('An error occurred while updating the schedule.');
        }
    } else {
        sendError('Schedule not found.');
    }
} else {
    sendError('Invalid request: no data received.' );
}
?>
