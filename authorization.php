<?php


require_once('database.php'); 
require_once('functions.php'); 


$db = Database::getInstance(); 
$connection = $db->getConnection(); 

$username = $_REQUEST["username"];
$timeNow = date("Ymdhis");
$sum=$username.$timeNow;
$token=hash("md5",$sum,false);



$sql = "INSERT INTO player (name,token)
VALUES ('{$username}','{$token}')";
$result =$connection->query($sql);
// როცა იუზერი პირველად შემოდის
// -- ტოკენის გენერაცია
if ($result) {
    setcookie("token", $token, time() + (86400 * 30), "/");

    $query = "SELECT id from player where name='{$username}' and token='{$token}'";
    $result =$connection->query($query);
    if($result){
        $row = $result->fetch_array(MYSQLI_ASSOC);
        session_start();
        $_SESSION["id"] = $row["id"];
        joinGame($_SESSION["id"]);
    }

} else {

    echo "Failure";

}


?>