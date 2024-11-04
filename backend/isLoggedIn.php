

<?php
global$db;
require_once 'helper.php'; // pour accéder aux fonctions sendMessage et sendError
require_once 'mysqlConnect.php'; // pour accéder à la base de données

if(!isset($_SESSION['user_id'])) {
    sendError('L\'utilisateur n\'est pas connecté');
} else {
    $user_id = $_SESSION['user_id'];

    $stmt = $db->prepare("SELECT * FROM users WHERE userID = :user_id");
    $stmt->execute([':user_id' => $user_id]);
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($user) {
        sendMessage($user); // envoie les horaires sous forme de JSON
    } else {
        sendError('Aucun horaire trouvé pour cet utilisateur.');
    }
}
?>
