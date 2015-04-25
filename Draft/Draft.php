<?php

require ("db_connection.php");

//create a 2D array that will store everyone's draft picks
$overallpicks = array
(
	$pickone = array(0)
);


//Go through the array, assigning the draft picks to each player
//start by specifying the "pick" or "player"
for($p=0; $p<12; $p++)
{
	//then set the round
	for($r=0; $r<17; $r++)
	{
		//if the round is 0, set the pick as 0
		//that way we can start counting as 1
		//and draft picks will be the same number as the array's index
		if($r==0)
			$overallpicks[$p][$r] = 0;
		else if ($r%2 == 0)
		{
			//normally, you would have to add 1 at the end
			//but since we index at 0 we don't need to
			$overallpicks[$p][$r] = ($r * 12) - ($p);
		}
		else
		{
			//likewise, we have to add 1 at the end here
			$overallpicks[$p][$r] = (($r - 1) * 12) + $p + 1;
		}
	}
}

//this array stores the picks so I can parse it into a csv file
//not needed for the final project, but it is good to check work easily
//and functions as a backup for the DB
$csv_array = array
(
	array('1')
);
//Load in the text file that has each draft pick listed in order
$array = split("\n", file_get_contents('raw.txt'));

for($pick = 0; $pick < 12; $pick++)
{
	$actual = $pick+1;

	//beginning of our query
	$insert_query = "INSERT INTO draft VALUES (".$actual;

	echo "Results for pick $actual <br />";
	for($round = 1; $round < 16; $round++)
	{
		//echo $pickone[$round]."<br />";
		echo rtrim($array[$overallpicks[$pick][$round]])."<br />";
		$current = $array[$overallpicks[$pick][$round]];
		$csv_array[$pick][$round] = $current;
		
		$insert_query .= ", '".mysqli_real_escape_string($link, $array[$overallpicks[$pick][$round]])."'";
		
	}

	$insert_query .= ");";
	echo $insert_query;
	echo "<br />";

	mysqli_query($link,$insert_query)
		or die(mysqli_error());
}



//PHP makes it easy to write an array to a CSV file
//So, we might as well do it to check our work quickly
$fp = fopen('Draft.csv', 'a');
foreach ($csv_array as $fields)
{
	fputcsv($fp, $fields);
}

fclose($fp);

?>