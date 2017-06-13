<?php

define("HOSTNAME","MySQL server location");
define("USERNAME","MySQL username");
define("PASSWORD","MySQL Password");
define("DATABASE", "Your Database name");

$dbhandle=new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE) or die ("Unable to Connect to the Database");

$sqlQuery=json_decode(file_get_contents("php://input"));

$sql=$sqlQuery->sql;


//Execurte this function if sql query is SELECT
if (strpos($sql, 'SELECT') !== false) {
    $rs=$dbhandle->query($sql);

    while($row=$rs->fetch_array(MYSQLI_ASSOC)){
        $data[]=$row;
    }

    print json_encode($data);

} else if (strpos($sql, 'INSERT') !== false) {
    
    $dbhandle->query($sql);
    
    if ($dbhandle->query($sql) == true) {
        print "Data is inserted successfully.";
    } else {
        print "Wrong Syntax.";
    }
   
    
} else if (strpos($sql, 'UPDATE') !== false) {
    
    $dbhandle->query($sql);
    
    if ($dbhandle->query($sql) == true) {
        print "Data is updated successfully.";
    } else {
        print "Wrong Syntax.";
    }
    
} else if (strpos($sql, 'DELETE') !== false) {

    $dbhandle->query($sql);
    
    if ($dbhandle->query($sql) == true) {
        print "Data is deleted successfully.";
    } else {
        print "Wrong Syntax.";
    }
    
}


?>