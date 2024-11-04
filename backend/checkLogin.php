<?php
global$db;
require_once 'mysqlConnect.php';
require_once 'helper.php'; // inclus le fichier helper.php
require_once 'config.php'; // inclus le fichier de configuration de la base de données

if(!isset($_POST['login']) || !isset($_POST['password'])) {
    sendError('Les champs login et/ou password ne sont pas définis.'); // envoie un message d'erreur si les champs login ou password ne sont pas définis
} else {
    $login = $_POST['login'];
    $password = $_POST['password'];

    $stmt = $db->prepare("SELECT * FROM users WHERE login = :login AND password = :password");
    $stmt->execute([':login' => $login, ':password' => $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if($user) {
        $_SESSION['user_id'] = $user['userID'];
        $_SESSION['user_name'] = $user['firstName'];
        $_SESSION['user_role'] = $user['role'];
        sendMessage('' ); // envoie un message JSON avec une chaîne vide si l'utilisateur est trouvé
    } else {
        sendError('Login/Password invalide.'); // envoie un message d'erreur si l'utilisateur n'est pas trouvé
    }
}
?>
