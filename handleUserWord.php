<?php
require_once('database.php'); 
require_once('functions.php'); 


$db = Database::getInstance(); 
$connection = $db->getConnection(); 

$word = $_POST["word"];
$score = $_POST["score"];

session_start();
$player_id=$_SESSION["id"];

$arr=array();
$arr.array_push($word);
$arr.array_push($score);

apcu_store($player_id,arr);

?>