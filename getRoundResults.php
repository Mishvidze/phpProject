<?php


require_once('database.php'); 
require_once('functions.php'); 


$db = Database::getInstance();
$connection = $db->getConnection(); 

session_start();
$player_id=$_SESSION["id"];

$query = "SELECT player_id from tables where game_id={ SELECT id from game where state=2 and player_id='{$player_id}' } '";
$result =$connection->query($query);

$response =Array();

if($result){
    while($row = $result->fetch_array(MYSQLI_ASSOC)){

        $isWordValid = isInDatabase(apcu_fetch($row["player_id"])[1]);
        $tmpArr=Array(
            "id" => $row["player_id"],
            "word"=> apcu_fetch($row["player_id"])[0],
            "score" => apcu_fetch($row["player_id"])[1],
            "isWordValid" => $isWordValid
        );

        array_push($response,$tmpArr);
    }
}

echo json_encode($response);

?>