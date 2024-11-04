<?php
global$db; require_once 'mysqlConnect.php';
session_start(['cookie_samesite' => 'Lax']);

function authenticate() {
    global $db;
    if(isset($_POST['login']) && isset($_POST['password'])) {
        $stmt = $db->prepare("SELECT * FROM users WHERE login = :login AND password = :password");
        $stmt->execute([':login' => $_POST['login'], ':password' => $_POST['password']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);


        if($user) {
            $_SESSION['user_id'] = $user['userID'];
            return true;
        }
    }
    return false;
}

function isAuthenticated() {
    return isset($_SESSION['user_id']);
}


?>

