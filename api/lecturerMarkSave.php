<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

require 'vendor/autoload.php'; // Include the Composer autoloader
use MongoDB\Client;

$mongoUri = 'mongodb://localhost:27017';
$databaseName = 'AES';

$client = new Client($mongoUri);
$collection = $client->$databaseName->mark;

$inputs = json_decode(file_get_contents('php://input'), true);

$insertResult = $collection->insertOne([
    'studentId' => $inputs['studentId'],
    'subjectId' => $inputs['subjectId'],
    'subjectName' => $inputs['subjectName'],
    'mark' => $inputs['mark'],
    'grade' => $inputs['grade']
]);

if ($insertResult->getInsertedCount() === 1) {
    $response = ['status' => 1, 'message' => 'Record created successfully.'];
} else {
    $response = ['status' => 0, 'message' => 'Failed to create record.'];
}

echo json_encode($response);
?>