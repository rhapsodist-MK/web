<?php
    $host = 'localhost';
    $db_username = 'root';
    $db_password = '';
    $db_name = 'rhapsodist';
    $db_type = 'mysql';

    $dns = "$db_type:host=$host;dbname=$db_name;charset=utf8";

    try{
        $pdo = new PDO($dsn, $db_username, $db_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }catch(PDOException $e){
        die('error : ' . $e->getMessage());
    }