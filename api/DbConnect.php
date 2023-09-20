<?php
require 'vendor/autoload.php'; // Include the Composer autoloader

use MongoDB\Client; // Add this line to import the MongoDB\Client class

class DbConnect {
    private $host = 'mongodb://localhost:27017';
    private $dbname = 'AES';

    public function connect() {
        try {
            $client = new Client($this->host);
            $database = $client->selectDatabase($this->dbname);
            return $database;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}
?>