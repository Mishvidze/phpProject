<?php

require_once('functions.php'); 
require_once('database.php');

$token = $_POST["token"];

$db = Database::getInstance(); 
$connection = $db->getConnection();
$queryOnCheck = "SELECT name, id from player where token='{$token}'";
$resultOnCheck =$connection->query($queryOnCheck);

if($resultOnCheck->num_rows == 0){
     setcookie("token", "", time() - 3600, "/");
}
else{

    $row = $resultOnCheck->fetch_array(MYSQLI_ASSOC);
    session_start();
    $_SESSION["id"] = $row["id"];
    echo $row["name"];

    joinGame($_SESSION["id"]);
}

?>

