<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");  
header("Access-Control-Allow-Methods: *");

header("Content-Type: application/json; charset=UTF-8");

$phpFiles = ['user.php', 'mark.php'];

foreach ($phpFiles as $phpFile) {

  if (file_exists($phpFile)) {
    include $phpFile;
  } else {
    http_response_code(404);
    echo json_encode(['error' => 'File not found: ' . $phpFile]);
  }

}

?>