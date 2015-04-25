$(document).ready(function()
{
	var roundValue = $('#roundValue').val();
	
	for (i=roundValue;i<16;i++)
	{
	
		var s1 = parseFloat ($('#round'+i+'_1').val());
		var s2 = parseFloat ($('#round'+i+'_2').val());
		var s3 = parseFloat ($('#round'+i+'_3').val());
	
		var title1 = $('#round'+i+'_title1').val();
		var title2 = $('#round'+i+'_title2').val();
		var title3 = $('#round'+i+'_title3').val();
	
		var s1 = [s1];
		var s2 = [s2];
		var s3 = [s3];
		
		// Can specify a custom tick Array.
		// Ticks should match up one for each y value (category) in the series.
		var ticks = ['Picks'];
		 
		var plot1 = $.jqplot('chart'+i, [s1, s2, s3], {
			// The "seriesDefaults" option is an options object that will
			// be applied to all series in the chart.
			seriesDefaults:{
				renderer:$.jqplot.BarRenderer,
				rendererOptions: {fillToZero: true}
			},
			// Custom labels for the series are specified with the "label"
			// option on the series option.  Here a series option object
			// is specified for each series.
			series:[
				{label:title1},
				{label:title2},
				{label:title3}
			],
			// Show the legend and put it outside the grid, but inside the
			// plot container, shrinking the grid to accomodate the legend.
			// A value of "outside" would not shrink the grid and allow
			// the legend to overflow the container.
			legend: {
				show: true,
				placement: 'insideGrid'
			},
			axes: {
				// Use a category axis on the x axis and use our custom ticks.
				xaxis: {
					renderer: $.jqplot.CategoryAxisRenderer,
					ticks: ticks
				},
				// Pad the y axis just a little so bars can get close to, but
				// not touch, the grid boundaries.  1.2 is the default padding.
				yaxis: {
					min: 0
				}
			}
		});
	}
});