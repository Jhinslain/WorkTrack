<?php
require_once 'helper.php'; // pour accéder aux fonctions sendMessage et sendError
require_once 'mysqlConnect.php'; // pour accéder à la base de données

global $db;

if(!empty($_POST)) {


    $schedule = [
        'userId' => $_SESSION['user_id'],
        'userName' => $_SESSION['user_name'],

        'date' => $_POST['date'],
        'status' => $_POST['status'],
        'travelTime' => $_POST['travel_time'],
        'loadStatus' => $_POST['load_status'],
        'unloadStatus' => $_POST['unload_status'],
        'arrivalTime' => $_POST['arrival_time'],
        'departureTime' => $_POST['departure_time'],
        'breakTime' => $_POST['break_time'],
        'panier' => $_POST['panier'],
        'grandDeplacement' => $_POST['grand_deplacement'],
        'workLocation' => $_POST['work_location'],
        'commentaire' => $_POST['commentaire'],
    ];

    $schedule['loadStatus'] = filter_var($_POST['load_status'], FILTER_VALIDATE_BOOLEAN);
    $schedule['unloadStatus'] = filter_var($_POST['unload_status'], FILTER_VALIDATE_BOOLEAN);
    $schedule['panier'] = filter_var($_POST['panier'], FILTER_VALIDATE_BOOLEAN);
    $schedule['grandDeplacement'] = filter_var($_POST['grand_deplacement'], FILTER_VALIDATE_BOOLEAN);



    if (!empty($schedule['arrivalTime']) && !empty($schedule['departureTime']) && !empty($schedule['breakTime'])) {
        $totalWorkTimeInHours = ($schedule['departureTime'] - $schedule['arrivalTime'] - ($schedule['breakTime']/ 60) );
        $schedule['totalWorkTime'] = round($totalWorkTimeInHours,2);
    } else {
        $schedule['totalWorkTime'] = 0;  // Or whatever default value you want to use
    }

    // Create SQL query.
    $sql = "INSERT INTO schedules (userID, firstName, date, status, travel_time, load_status, unload_status, arrival_time, departure_time, break_time, panier, grand_deplacement, work_location, total_work_time, commentaire) 
            VALUES (:userId, :userName, :date, :status, :travelTime, :loadStatus, :unloadStatus, :arrivalTime, :departureTime, :breakTime, :panier, :grandDeplacement, :workLocation, :totalWorkTime, :commentaire)";

    // Prepare statement.
    $stmt = $db->prepare($sql);

    // Execute and check if successful.
    if ($stmt->execute($schedule)) {
        sendMessage('');
    } else {
        sendError( 'An error occurred while creating the schedule.');
    }
}
else {
    sendError('Invalid request: no data received.' );
}
?>
