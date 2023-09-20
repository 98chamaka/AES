<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

require 'vendor/autoload.php'; // Include the Composer autoloader
use MongoDB\Client;



$mongoUri = 'mongodb://localhost:27017';
$databaseName = 'AES';
$collectionName = 'mark'; // Replace with your actual collection name

$client = new Client($mongoUri);
$collection = $client->$databaseName->$collectionName;

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $collection = $client->$databaseName->$collectionName;
    
        if (isset($path[3]) && ctype_xdigit($path[3])) {
            $mark = $collection->findOne(['_id' => new MongoDB\BSON\ObjectID($path[3])]);
            $marks = $mark ? [$mark] : [];
        } else {
            $marks = $collection->find()->toArray();
        }
    
        echo json_encode($marks);
        break;
    

    case "POST":
        $mark = json_decode(file_get_contents('php://input'));

        // Prepare data for MongoDB insertion
        $markData = [
            'studentId' => $mark->studentId,
            'subjectId' => $mark->subjectId,
            'subjectName' => $mark->subjectName,
            'mark' => $mark->mark,
            'grade' => $mark->grade
        ];

        // Insert data into MongoDB collection
        $insertMark = $collection->insertOne($markData);

        if ($insertMark->getInsertedCount() === 1) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

        case "PUT":
            $mark = json_decode(file_get_contents('php://input'));
            
            // Extract the _id from the user object
            $markId = $mark->_id->{'$oid'};
            
            // Convert the string to MongoDB\BSON\ObjectID
            $objectId = new MongoDB\BSON\ObjectID($markId);
            
            $updateMark = $collection->updateOne(
                ['_id' => $objectId],
                ['$set' => [
                    'studentId' => $mark->studentId,
                    'subjectId' => $mark->subjectId,
                    'subjectName' => $mark->subjectName,
                    'mark' => $mark->mark,
                    'grade' => $mark->grade
                ]]
            );
            
            if ($updateMark->getModifiedCount() === 1) {
                $response = ['status' => 1, 'message' => 'Record updated successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update record.'];
            }
            echo json_encode($response);
            break;
        

            case "DELETE":
                $path = explode('/', $_SERVER['REQUEST_URI']);
                $markToDeleteId = $path[3];
            
                $collection = $client->$databaseName->$collectionName;
            
                $deleteMark = $collection->deleteOne(['_id' => new MongoDB\BSON\ObjectID($markToDeleteId)]);

            
                if ($deleteMark->getDeletedCount() === 1) {
                    $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to delete record.'];
                }
                echo json_encode($response);
                break;
                
}