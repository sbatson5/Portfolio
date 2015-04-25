<?php

require ("db_connection.php");

$sql = "SELECT R1, COUNT(*) as c FROM draft WHERE pick=1 GROUP BY R1;";

$result = mysqli_query($link,$sql)
	or die(mysqli_error());

while($row = mysqli_fetch_row($result))
{
	echo count($result);
	//echo $row[0];
	echo "<br />";
	//echo $row[1];

}



//echo "Hello <br />";
?>