<?php
	
	if(apcu_fetch('isFull')==true){
			require_once('database.php'); 
			$db = Database::getInstance(); 
			$connection = $db->getConnection(); 

			session_start();
			$player_id=$_SESSION["id"];

			$queryGameCheck ="SELECT name, player_id from tables t, player p where active=1 and game_id=(SELECT game_id from tables where player_id='{$player_id}') and t.player_id=p.id order by name ASC";
			$resulGameCheck =$connection->query($queryGameCheck);

			$response =Array();

			if($resulGameCheck){
				while($row = $resulGameCheck->fetch_array(MYSQLI_ASSOC)){

					$b=0;
					if($row["player_id"] == $player_id){
						$b=1;
					}

					$tmpArr=Array(
						"username" => $row["name"],
						"me" => $b,
						"playerId" => $row["player_id"]
					);

					array_push($response,$tmpArr);
				}
			}

			echo json_encode($response);

	}
	

?>