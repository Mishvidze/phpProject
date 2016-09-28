<?php

require_once('database.php'); 
$db = Database::getInstance(); 
$connection = $db->getConnection(); 

function joinGame($player_id){
    global $connection;
    $queryGameCheck = "SELECT id from game where state=1";
    $resulGameCheck =$connection->query($queryGameCheck);

    if($resulGameCheck->num_rows == 0){ // რაც ნიშბავს, რომ 'on' ტიპის game არ არსებობს
        addNewGame();

    }

    $queryGameCheck = "SELECT id from game where state=1";
    $resulGameCheck =$connection->query($queryGameCheck);
    if($resulGameCheck ){

        $row = $resulGameCheck->fetch_array(MYSQLI_ASSOC);
        $game_id=$row["id"];
        

        $query = "SELECT id from tables where game_id='{$game_id}' and active=1";
        $result =$connection->query($query);
        if($result){
            if($result->num_rows < 4){
                $sql1 = "INSERT INTO tables (player_id, game_id, active)
                VALUES ('{$player_id}','{$game_id}',1)";
                $result1 =$connection->query($sql1);

                if($result->num_rows == 3){
                    $sql2 = "UPDATE game SET state=2 where id='{$game_id}'";
                    $connection->query($sql2);
                    startTheGame();
                }
            }
        }
    }
}

function addNewGame(){
    global $connection;
    $sql1 = "INSERT INTO game (state)
    VALUES (1)";
    $connection->query($sql1);
}

function startTheGame(){
    apcu_store('isFull', true);
    generateIndexes();
}

function generateIndexes(){
    $arr=array();
    for ($i = 0; $i <= 83; $i++) {
        $arr[$i] = rand(0,32);
    }
    apcu_store("indexes",$arr);
}

function isInDatabase($word){
    global $connection;
    $query = "SELECT id from words where word='{$word}'";
    $result =$connection->query($query);
    if($result){
        if($result->num_rows > 0){
            return 1;
        }
    }
    return 0;
}

?>