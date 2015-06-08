var app = angular.module('projectsApp', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/projects', {
        templateUrl: 'partials/projects.html',
        controller: 'ProjectsController'
      }).
      when('/info/:id', {
        templateUrl: 'partials/details.html',
        controller: 'ProjectsController'
      }).
	  when('/code/:id', {
        templateUrl: 'code/examples.html',
        controller: 'CodePageController'
      }).
      otherwise({
        redirectTo: '/projects'
      });
  }]);


//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
app.controller('ProjectsController', function ($scope, $routeParams, projectsService) {
    init();

    function init() {
  		//if there are paramaters (id) call getSpecific
  		var hasParams = Boolean(Object.keys($routeParams).length);
  		if(hasParams) {
  			$scope.projects = projectsService.getSpecific($routeParams.id);
  		}
  		//otherwise, pull them all
  		else {
          	$scope.projects = projectsService.getProjects();
  		}
    }
});


//Controller for the examples pages
//we need to control which html doc is loaded to show the relevant work
app.controller('CodePageController', function ($scope, $routeParams, projectsService) {
    init();

    function init() {
  		//if there are paramaters (id) call getSpecific
  		//there should always be params on this page, but it is best to check
  		var hasParams = Boolean(Object.keys($routeParams).length);
  		if(hasParams) {
  			$scope.projects = projectsService.getSpecific($routeParams.id);
  		}
  		//otherwise, pull them all
  		else {
      	$scope.projects = projectsService.getProjects();
  		}
  		
  		//our array which will hold all of our URL values
  		$scope.allPages = [
  		{
  			url: 'code/adminjs.html' //0
  		},
  		{
  			url: 'code/draft.html' //1
  		},
  		{
  			url: 'code/tileCode.html' //2
  		},
  		{
  			url: 'code/submitCode.html' //3
  		},
  		{
  			url: 'code/storedProc.html' //4
  		},
  		{
  			url: 'code/hallofheroes.html' //5
  		},
  		{
  			url: 'code/scrapStreet.html' //6
  		},
  		{
  			url: 'code/angular.html' //7
  		},
  		{
  			url: 'code/angular.html' //7
  		}]
  		
  		//our JSON list of projects will give us the int we need in order to load the right page
  		$scope.activePage = $scope.allPages[$scope.projects.exampleInt];
    }
});


//This handles retrieving data and is used by controllers
app.service('projectsService', function () {
  this.getProjects = function () {
      return projects;
  };
	
	this.getSpecific = function (id) {
		for(i=0;i<projects.length;i++)
		{
			if(projects[i].id == id) {
				return projects[i];
      }
		}
	};

    var projects = [
		{
      id: "Portfolio", 
			Title: 'My Portfolio - built with AngularJS', 
			link: 'http://www.scottbatson.com/', 
			description: 'Thanks for taking a look at my Portfolio.  This site was created using AngularJS, however the projects here cover a much wider range of languages.  Click on the Title to go back to my homepage and feel free to click around my projects.  Each one will have a link showing the web app and a link with some examples of the code I used as well as a breakdown of my thought process.  Feel free to check out how I did this portfolio with a full breakdown of all my AngularJS code.', 
			skills: 'HTML5, CSS3, CSS Pre-Processors (LESS), CSS Media Queries, JavaScript, jQuery, jQuery Libraries, Bootstrap, WordPress, Twitter API, Facebook API, PHP, ASP, MySQL, SQL, Stored Procedures, C#, Java, JSON, XML, Unity3D, ActionScript, AngularJS, AJAX',
			image: 'AngularJS_Banner.jpg',
			image2: 'AngularJS_Banner.jpg',
			exampleInt: 8
    },
		{
      id: "AboutMe", 
			Title: 'About Me', 
			link: 'http://www.scottbatson.com/', 
			description: 'Over the years, I have spent a lot of time taking classes and teaching myself new programming languages, techniques and software to better prepare myself for the professional world. I have a lot of real-world experience with languages ranging from SQL to C# to HTML5 and I spend a lot my freetime working on creative projects.  I am a really fast learner with a passion for technology and writing.  Feel free to look around my portfolio and let me know what you think.', 
			skills: 'HTML5, CSS3, CSS Pre-Processors (LESS), CSS Media Queries, JavaScript, jQuery, jQuery Libraries, Bootstrap, WordPress, Twitter API, Facebook API, PHP, ASP, MySQL, SQL, Stored Procedures, C#, Java, JSON, XML, Unity3D, ActionScript, AngularJS, AJAX',
			image: 'newScott.png',
			image2: 'scott.png',
			exampleInt: 7
    },
    {
      id: "Snap", 
			Title: 'Snap Surveys - My work on client projects', 
			link: 'http://www.snapsurveys.com/', 
			description: 'Our website needed a huge overhaul after almost a decade of the same template. The largest issue we had was that it was not mobile friendly. Working with a team of developers and graphic designers, we implemented Twitter Bootstrap to update our site for modern business. This saw a huge increase in traffic and search engine results, bringing us back to the number 1 page on Google when searching for "Survey Software."\n\nMost of projects were for clients directly--building branded surveys as well as custom solutions for data collection.  One of my largest projects was creating a site for users to store and download data securely.', 
			skills: 'Bootstrap, Wordpress, jQuery, woocommerce',
			image: 'snapsurveys.png',
			image2: 'snapsurveys.png',
			exampleInt: 3
    },
    {
      id: "Hall", 
			Title: 'Hall of Heroes - Video game tracker', 
			link: 'http://scottbatson.com/hallofheroes/', 
			description: 'My friends and I are avid gamers and spend a lot of our time discussing games, news in the industry and more. One thing we have done since 2006 is track which games we have beat in a forum thread called "Hall of Heroes." We wanted to add a little more ceremony to it and that is when this site was born. I use the GiantBomb API to search for games and my own user database to track the games people have beat. I have the site using both XML and JSON to pull results, PHP to store information in a MySQL database, AJAX to load content, jQuery to dynamically change the pages and lots of CSS3 tricks to make presentable.', 
			skills: 'JSON, PHP, PDO, MySQL, Facebook API, AJAX, jQuery',
			image: 'hallofheroes.png',
			image2: 'hallofheroes.png',
			exampleInt: 5
    },
		{
      id: "ScrapStreet", 
			Title: 'Scrap Street Journal - Wordpress blog', 
			link: 'http://scrapstreetjournal.com/', 
			description: 'I work on a Wordpress site with some my friends where we post about video games, movies, TV and more.  I customized the theme myself utilzing media queries and advanced CSS3 tricks such as nth-child, nth-last-of and more.  Since I could not edit the source files directly, I had to come up with clever ways to get the styling I wanted.', 
			skills: 'Wordpress, CSS3',
			image: 'scrapstreet.png',
			image2: 'scrapstreet.png',
			exampleInt: 6
    },
		{
      id: "FantasyFootball", 
			Title: 'Fantasy Mock Drafts - Analysis on football', 
			link: 'http://scottbatson.com/Draft/chart.php?round=1&pick=1', 
			description: 'As someone who loves Fantasy Football, I created a web app that would pull my mock draft results and allow me to report on them to better predict my potential team and the draft patterns of my league.', 
			skills: 'PHP, MySQL, Regex, Algorithm',
			image: 'assets/img/chart.png',
			image2: 'assets/img/chart.png',
			exampleInt: 1
    },
		{
      id: "Tile", 
			Title: 'Tile Game - A quick web game', 
			link: 'http://scottbatson.com/tile.html', 
			description: 'This started as an HTML mock up of the IIS8 splash image. Once I had it created, I wanted to use CCS3 animations to make the tiles move. I use jQuery to then hide images and keep track of the player\'s selections. To save some time, I also use Less (a CSS Pre-processor) to reduce the amount of code.', 
			skills: 'CSS3 Animations, Less, HTML5, jQuery',
			image: 'assets/img/tile.png',
			image2: 'assets/img/tile.png',
			exampleInt: 2
    },
		{
      id: "SurveyPHP", 
			Title: 'Survey Response Management - Client project for survey data', 
			link: 'http://scottbatson.com/snapphp2/snapphp2/login.php', 
			description: 'Working for a research software company, we had many solutions. One of our older solutions was HTML surveys. These were great because people could post them on their own server but it relied on a script on our server to email the data back to them. For one client, this wasn\'t a possiblity but they didn\'t want to go with our cloud-based solution as they liked the HTML Surveys. I created a full site with PHP, MySQL, HTML5, CSS3 and jQuery to host their survey data. This site gave them an admin user which could create other users, manage the number of responses and report on their users. I wrote this site completely by myself from the server-side code to the front-end. \n\n  You can log in with Username: root and Password: root.', 
			skills: 'CSS3, HTML5, MySQL, PHP, JavaScript, jQuery',
			image: 'assets/img/SnapPHP.png',
			image2: 'assets/img/SnapPHP.png',
			exampleInt: 0
    },
		{
      id: "Databases", 
			Title: 'Working with Databases - Client project in SQL', 
			link: 'http://scottbatson.com/code/storedProc.html', 
			description: 'A manufacturer had a pretty basic database that stored information on their customers, products, sales reps, offices and orders. This worked for some basic queries and reporting, however we needed to create a system that handled reorders when the quantity on hand ran too low and a way to print shipping labels. All of the code I ran was written directly in the console. No programs were used to write these queries for me.', 
			skills: 'SQL, MySQL, Stored Procedures, PuTTY',
			image: 'mysql.jpg',
			image2: 'mysql.jpg',
			exampleInt: 4
    }
  ];
});






