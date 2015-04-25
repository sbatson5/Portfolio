<DOCTYPE HTML>

<?php

require ("db_connection.php");

$user_pick = $_GET['pick'];

?>
<head>

	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Draft Results</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Custom styles for this template -->
    <link href="css/carousel.css" rel="stylesheet">
	<link href="css/map.css" rel="stylesheet">
    
	<script type="text/javascript" src="src/jquery.min.js"></script>
	<script type="text/javascript" src="src/jquery.jqplot.js"></script>
	<script type="text/javascript" src="src/excanvas.min.js"></script>
	<script type="text/javascript" src="src/plugins/jqplot.barRenderer.min.js"></script>
	<script type="text/javascript" src="src/plugins/jqplot.categoryAxisRenderer.min.js"></script>
	<script type="text/javascript" src="src/plugins/jqplot.pointLabels.min.js"></script>
	<script type="text/javascript" src="scripts/plot.js"></script>

	<link rel="stylesheet" href="src/jquery.jqplot.min.css" />
</head>
<body>
  
    <div class="navbar-wrapper">
      <div class="container">

        <div class="navbar navbar-inverse navbar-static-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Project name</a>
            </div>
            <div class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li class="dropdown">
                  <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li class="divider"></li>
                    <li class="dropdown-header">Nav header</li>
                    <li><a href="#">Separated link</a></li>
                    <li><a href="#">One more separated link</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div> <!-- end of nav wrapper -->
    
    



    <div class="container marketing">
    
    <?php
	
	$numberOfRounds = 16 - $_GET['round'];;
	echo '<input type="hidden" value="'.$_GET['round'].'" id="roundValue" />';
	$additionalQuery = "AND R1 = 'Marshawn Lynch (Sea - RB)'";
	
	for ($t=0; $t<$numberOfRounds; $t++)
	{
		$round_number = $_GET['round']+$t;
		$round_pick = "R".$round_number;
		
		$sql = "SELECT $round_pick, COUNT(*) as c FROM draft WHERE pick = $user_pick GROUP BY $round_pick ORDER BY c desc;";
		//echo $sql;
		
		$round = mysqli_query($link,$sql)
		or die(mysqli_error());
		
		$round_array = array();
		$player_array = array();
		$i = 0;
		
		while($row = mysqli_fetch_row($round))
		{
			$player_array[$i] = $row[0];
			$round_array[$i] = $row[1];
			$i++;
		}
		
		echo '<input type="hidden" value="'.$player_array[0].'" id="round'.$round_number.'_title1" />';
		echo '<input type="hidden" value="'.$player_array[1].'" id="round'.$round_number.'_title2" />';
		echo '<input type="hidden" value="'.$player_array[2].'" id="round'.$round_number.'_title3" />';
		echo '<input type="hidden" value="'.$round_array[0].'" id="round'.$round_number.'_1" />';
		echo '<input type="hidden" value="'.$round_array[1].'" id="round'.$round_number.'_2" />';
		echo '<input type="hidden" value="'.$round_array[2].'" id="round'.$round_number.'_3" />';
		
		echo '<hr class="featurette-divider">';

		echo '<div class="row featurette">';
		if ($t%2==0)
		{
			echo '<div class="col-md-7">';
			  	echo '<h2 class="featurette-heading">Draft Results. <span class="text-muted">Here are the results for Round '.$round_number.'</span></h2>';
			  	echo '<p class="lead">Based on our data, the most likely selection here would be '.$player_array[0].' followed by '.$player_array[1].'.</p>';
			echo'</div>';
				echo '<div class="col-md-5" id="chart'.$round_number.'" style="height:500px;width:500px;">';
				echo '</div>';	
		  echo '</div>';
		}
		else
		{
			echo '<div class="col-md-5" id="chart'.$round_number.'" style="height:500px;width:500px;">';
			echo '</div>';
			echo '<div class="col-md-7">';
			  echo '<h2 class="featurette-heading">Draft Results. <span class="text-muted">Here are the results for Round '.$round_number.'</span></h2>';
			  echo '<p class="lead">Based on our data, the most likely selection here would be '.$player_array[0].' followed by '.$player_array[1].'.</p>';
			echo'</div>';
		  	echo '</div>';
		}
		
	}
	
	?>
      <hr class="featurette-divider">

      <!-- /END THE FEATURETTES -->


      <!-- FOOTER -->
      
      <footer>
        <p class="pull-right"><a href="#">Back to top</a></p>
        <p>&copy; 2014 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>

    </div><!-- /.container -->




    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/docs.min.js"></script> -->
    
</body>
</html>