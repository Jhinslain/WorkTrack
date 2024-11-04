<?php
global$db;
require_once 'helper.php'; // pour accéder aux fonctions sendMessage et sendError
require_once 'mysqlConnect.php'; // pour accéder à la base de données


if(!isset($_SESSION['user_id'])) {
    sendError('L\'utilisateur n\'est pas connecté');

}else if($_SESSION['user_role']=='administrateur') {
    $stmt = $db->prepare("SELECT * FROM schedules");
    $stmt->execute();
    $schedules = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($schedules) {
        sendMessage($schedules); // envoie les horaires sous forme de JSON
    } else {
        sendError('Aucun horaire trouvé pour cet utilisateur.');
    }

} else {
    $user_id = $_SESSION['user_id'];

        $stmt = $db->prepare("SELECT * FROM schedules WHERE userID = :user_id");
        $stmt->execute([':user_id' => $user_id]);
        $schedules = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($schedules) {
        sendMessage($schedules); // envoie les horaires sous forme de JSON
    } else {
        sendError('Aucun horaire trouvé pour cet utilisateur.');
    }
}
?>

