<?php

require_once('database.php'); 
$db = Database::getInstance(); 
$connection = $db->getConnection(); 

session_start();
$player_id=$_SESSION["id"];

$query = "UPDATE tables SET active=0 where player_id='{$player_id}'";
$connection->query($query);

?>