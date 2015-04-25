$(document).ready(function(e) {
	//every time someone clicks on a link with a hash
    $('a[href*=#]').click(function () {
        var target = $(this).attr('href');
		$(target).animate(
		{
			right: "0%"
		}, 1000);
		$('.content').each(function(){
			var newTarget = "#"+$(this).attr('id');
			//if this div is the one we want to show
			if(newTarget == target)
			{
				//do nothing
			}
			else
			{
				//even though we define this as percents in our css
				//the browser still renders it as pixels
				//make sure we only move the div showns
				if($(this).css('right') == "0px")
				{
					$(this).animate(
					{
						left: "100%"
					}, 1000, function() {
						//even though we slid to the right we want them
						//to keep coming from the left, so reset the positions
						$(this).css(
						{
							left: "",
							right: "100%"
						});
					});
				}
			}
		});
    });
});