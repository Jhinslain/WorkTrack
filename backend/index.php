<?php

// obtenir la route à partir de la requête
$route = $_SERVER['REQUEST_URI'];

// utilisez un switch pour gérer les différentes routes
switch ($route) {
    case '/getUser':
        // inclure le script pour obtenir un utilisateur
        include 'getUser.php';
        break;

    case '/createUser':
        // inclure le script pour créer un utilisateur
        include 'createUser.php';
        break;

    // ajoutez d'autres cas pour chaque route de votre API

    default:
        // envoyer une réponse 404 si la route n'est pas reconnue
        http_response_code(404);
        echo 'Page not found';
        break;
}
?>