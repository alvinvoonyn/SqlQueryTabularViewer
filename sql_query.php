<?php

define("HOSTNAME","Insert your hostname of MySQL here");
define("USERNAME","Insert your username of MySQL here");
define("PASSWORD","Insert your password of MySQL here");
define("DATABASE", "Insert the name of database here");

$dbhandle=new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE) or die ("Unable to Connect to the Database");

$sqlQuery=json_decode(file_get_contents("php://input"));

$sql=$sqlQuery->sql;

//Execurte this function if sql query is SELECT
if (strpos($sql, 'SELECT') !== false) {
    $rs=$dbhandle->query($sql);
    
    if ($dbhandle->error) {
        print_r($dbhandle->error);
    } else {
        while($row=$rs->fetch_array(MYSQLI_ASSOC)){
            $data[]=$row;
        }
        
        print json_encode($data, JSON_NUMERIC_CHECK);
    }
    
} 

?>