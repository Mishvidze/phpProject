<?php

$response=apcu_fetch("indexes");

echo json_encode($response);

?>