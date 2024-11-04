<?php
global $db;
require_once 'mysqlConnect.php';
require_once 'helper.php'; // inclus le fichier helper.php


if(!isset($_POST['user_Name'])) {
    sendError('Le paramètre user est manquant.');
} else {
    $user = $_POST['user_Name'];

    $stmt = $db->prepare("SELECT * FROM schedules WHERE firstName = :user");
    $stmt->execute([':user' => $user]);
    $schedule = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($schedule) {
        sendMessage($schedule);
    } else {
        sendMessage(array());
    }
}

?>