$(function(){

	function localize(key) { return $('#localized_strings').find('.'+key).text(); }
	/* ************************************
	 *		   Chart.js library config
	 * ************************************/
	Chart.defaults.global.legend.labels.usePointStyle = true;
	Chart.defaults.global.elements.point.radius = 0;
	Chart.defaults.global.elements.point.hoverRadius = 4;
	Chart.defaults.global.elements.point.hitRadius = 15;

	/* ************************************
	 *		   graph options
	 * ************************************/
	var opts = {
		responsive: true,
		bezierCurve: false,
		elements: {
			line: { tension: 0 }
		},
		scales: {
			yAxes: [{
			    id: 'A',
			    ticks: { beginAtZero: true, },
			},{
			    id: 'B',
			    ticks: { beginAtZero: true, },
			    position:'right',
			    display: 'auto',
			}],
		},
		animation: { duration: 750 },
		legend: { display: false },
		legendCallback: function(chart) {	
			var $legend = $('<ul></ul>');
			// block scribe on Yabla Chinese
			chart.data.datasets.forEach(function(d) {
				if (!(PRODUCT_ID == 9 && d.label == 'Scribe'))
					$legend.append(buildLegendItem(d));
			});

			return $legend[0].outerHTML;
		},
	}
	// for stacked chart
	var opts_stacked = $.extend({}, opts, {
		scales: {
			yAxes: [{
			    id: 'A',
			    stacked: true,
			    ticks: { beginAtZero: true, },
			}],
			xAxes: [{
			    stacked: true,
			    ticks: { beginAtZero: true, },
			}]
		}
	});

	/* ************************************
	 *		   constants
	 * ************************************/
	var COLORS = {
		green: '#76dc9b',
		orange: '#f6822b',
		brown: '#A52A2A',
		yellow: '#f4de78',
		blue: '#1f78b4',
		lightBlue: '#a6cee3',
	    pink: "#eb5a2f",
	    purple: "#9377d4",
	    red: "#dc0505",
	    greendark: "#008600",
	};

	var dataTypeLookup = {
		// TODO: localize these labels!
		cloze: { label: localize('fitb'), color: COLORS.lightBlue },
		choice: { label: localize('multiple_choice'), color: COLORS.blue },
		dictation: { label: localize('scribe'), color: COLORS.orange },
		recall: { label:localize('recall'), color: COLORS.red },
		speak: { label:localize('speak'), color: COLORS.brown },
		parrot: { label:localize('parrot'), color: COLORS.greendark },
		comprehension: { label: localize('comprehension'), color: COLORS.purple},
		vocab: { label: localize('vocabulary'), color: COLORS.yellow },
		total: { label: localize('total'), color: COLORS.green },
		videos_watched: { label: localize('videos_watched'), color: COLORS.blue },
		games_played: { label: localize('games_played'), color: COLORS.orange },
		minutes: { label: localize('minutes_on_site'), color: COLORS.green, yAxisId: 'B' }
	};

	/* ************************************
	 *		   helper functions
	 * ************************************/
	// remove year from date labels
	function truncateDateLabel(label) {
		return label.slice(5);
	}
	// get the canvas' 2d context
	function getCanvasContext(selector) {
		$canvas = $(selector).find('canvas');
		return $canvas.length ? $canvas[0].getContext('2d') : null;
	}
	// convert a hex color string to an rgba string
	function convertHex(hex,opacity) {
		hex = hex.replace('#','');
		r = parseInt(hex.substring(0,2), 16);
		g = parseInt(hex.substring(2,4), 16);
		b = parseInt(hex.substring(4,6), 16);
		result = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
		return result;
	}
	// build the markup for a line in the legend for a given datast
	function buildLegendItem(dataset) {
		return $('<li>')
			.append($('<span>').addClass('toggle').html('&nbsp;')
				.css('background-color', dataset.borderColor))
			.append($('<span>').addClass('label').text(dataset.label));
	}
	// build a data set object to feed to Chart.js
	function makeDataSets(rawData) {
		// raw data is formatted:
		// {
		//	<date string>: {
		//		type1: number,
		//		type2: number,
		//		...
		//	}
		//	...
		// }
		//
		// we want it to look like
		// {
		//	type1: [ number, number, ... ],
		//	type2: [ number, number, ... ],
		//	...
		// }
		//
		// where the "number"s are y values, and their indeces
		// correspond to date strings (x values)

		var dates = Object.keys(rawData).sort(),
			points = {};
		// sort the data points into arrays per game type
		// the arrays should be ordered chronologically
		dates.forEach(function(date) {
			for (var dataType in rawData[date]) {

				// initialize the data point list if necessary
				points[dataType] = points[dataType] || [];
				// push the data point into the list
				points[dataType].push(rawData[date][dataType]);
			}
		});

		// return data sets in Charts.js-friendly format
		return {
			labels: dates.map(truncateDateLabel),
			datasets: Object.keys(points).filter(function(dataType) {
				// if we don't have a lookup for the data type, skip it
				return !!(dataTypeLookup[dataType] && dataTypeLookup[dataType].label);
			}).map(function(dataType) {
				// make the data set
				var lookup = dataTypeLookup[dataType],
					label = lookup.label,
					color = lookup.color,
					yAxisId = lookup.yAxisId || 'A';

				return {
					label: label,
					fill: false,
					yAxisID: yAxisId,
					fillOpacity: 0.3,
					backgroundColor: convertHex(color, 0.5),
					pointBackgroundColor: color,
					borderColor: color,
					pointHighlightStroke: color,
					fillColor: color,
					borderCapStyle: 'butt',
					data: points[dataType]
				};
			})
		};
	}
	// filter out datapoints for a given type
	function excludeDataType(data, excludedType) {
		var dates = Object.keys(data).sort(),
			// get the data types from the first day's data
			types = Object.keys(data[dates[0]])
				// filter out the data type we don't want
				.filter(function(type) { return type != excludedType; });
		// build the filtered data object -- iterate by day
		return dates.reduce(function(result, date) {
			result[date] = result[date] || {};
			// copy the data for each useful data type
			types.forEach(function(type) {
				result[date][type] = data[date][type];
			});
			return result;
		}, {});
	}
	// launch a modal and move the div out to the body on dismiss
	function showAsModal(selector) {
		Modal_Master.show(selector);
		$('body').addClass('dont_scroll_when_modal_shown');
		Modal_Master.onDismiss = function() {
			$('body').append($(selector));
			$(selector).hide();
			$('body').removeClass('dont_scroll_when_modal_shown');
		};
	}

	/* ************************************
	 *		   daily goals
	 * ************************************/

	for (var goal in GOALS) {
		var status = GOALS[goal];
		status.gauge = loadLiquidFillGauge("fillgauge_"+goal, status.progress_pct);
	}

	$(window).on('resize', function(e) {
		setTimeout(function() {
			for (var goal in GOALS) {
				// get elements and dimensions
				var id = "fillgauge_"+goal,
					$goal = $('.goal_container.'+goal),
					$tv = $goal;
					$svg = $('#'+id),
					width = $svg.width(),
					height = $svg.height();

				$svg.remove();
				$svg = $("<svg id='"+id+"' class='fillgauge' \
						width='"+width+"' height='"+height+"'>");
				$tv.prepend($svg);

				// update the gauge
				var status = GOALS[goal];
				status.gauge = loadLiquidFillGauge(id, status.progress_pct);
			}
		});
	});

	$('.goal_popup_open').on('click', function(e){
		$.post('log_event.php',{
			name: 'Dashboard: open goals '
		})
		showAsModal('#goals_popup');
	});
	$('.exit_goals').on('click', function(e){
		Modal_Master.dismiss();
	});
	var done = false;
	$('.goals_form').on('submit', function(e) {
		e.preventDefault();
		var n = parseInt($(this).find('.target').val(), 10) || 1;
		$('.goal_details h2').text('Daily Goal: ' + n + (n === 1 ? ' Video' : ' Videos'));
		var g = GOALS.videos_watched;
		g.target = n;
		g.progress = Math.min(1, g.current / n);
		g.progress_pct = Math.round(g.progress * 100);
		loadLiquidFillGauge('fillgauge_videos_watched', g.progress_pct);
		Modal_Master.dismiss();
		return false;
	});


	/* ************************************
	 *		   news
	 * ************************************/
	// More News button binding
	$('#yabla_news').on('click touchend', function(e) {
		$.post('log_event.php',{
			name: 'Dashboard: open news '
		})
		showAsModal('#long_news_container');
	});
	// media item click handling
	$('body').on('click touchend', '.media_item', function(e) {
		if ($(e.target).is('a')) {
			return true;
		}
		var url = $(this).data('url');
		/* static snapshot: no navigation */
	});

	/* ************************************
	 *		   massage the data
	 * ************************************/
	function aggregate(scoresByDay, baseScores=false) {
		// if no base scores were passed in, start from zero!
		var lastDay = baseScores || {},
			days = Object.keys(scoresByDay).sort();

		// build the score aggregation by day
		return days.reduce(function(result, day) {
			var thisDay = {}, thisDaysScores = scoresByDay[day];
			// put the aggregation object into the list
			result[day] = thisDay;
			// aggregate scores for each game type for the current day
			Object.keys(thisDaysScores).forEach(function(type) {
				thisDay[type] = thisDaysScores[type] + lastDay[type] || 0;
			});
			// save the aggregation for the next iteration
			lastDay = thisDay;
			return result;
		}, {});
	}

	// build the various data sets
	var dataLookup = {
		usage: {
			weekly:  makeDataSets(USAGE.week),
			monthly: makeDataSets(USAGE.month)
		},
		xp: {
			weekly:  makeDataSets(SCORES.week),
			monthly: makeDataSets(SCORES.month)
		},
		xp_cum: {
			weekly:  makeDataSets(aggregate(SCORES.week)),
			monthly: makeDataSets(aggregate(SCORES.month))
		},
		// stacked graphs don't need total values -- the whole bar indicates the total
		xp_stacked: {
			weekly:  makeDataSets(excludeDataType(SCORES.week, 'total')),
			monthly: makeDataSets(excludeDataType(SCORES.month, 'total'))
		},
		xp_cum_stacked: {
			weekly:  makeDataSets(aggregate(excludeDataType(SCORES.week, 'total'))),
			monthly: makeDataSets(aggregate(excludeDataType(SCORES.month, 'total')))
		},
	};

	/* ************************************
	 *		   build the graphs
	 * ************************************/
	function buildLegendForGraph(graph, id) {
		var legendSelector = '#'+id+' .legend';

		// inject the legend into the DOM
		$(legendSelector).html(graph.generateLegend());

		// bind to click, delegate is the whole li
		$(legendSelector+' ul').on('click', 'li', function() {
			var $t = $(this),
				index = $t.index(),
				graphIsHidden = !graph.isDatasetVisible(index);

			// toggle the dataset's toggle's state
			$t.find('.toggle')[(graphIsHidden?'remove':'add')+'Class']('off');
			// set the flag in the metadata
			graph.getDatasetMeta(index).hidden = !graphIsHidden;
			// update the graph
			graph.update();
		});
	}
	function makeGraph(id, timeRange, opts, type='line') {
		var data = dataLookup[id][timeRange];

		if (IS_DEV) {
			console.log("building graph with id '"+id+"', using data: ", data);
		}	

		// build the graph
		graph = new Chart(getCanvasContext('#'+id), {
			type: type,
			datasetFill: false,
			pointDotRadius: 1,
			pointDotStrokeWidth: 8,
			pointHitDetectionRadius: 20,
			data: data,
			options: opts,
		});

		// build the legend
		buildLegendForGraph(graph, id);

		// return the graph
		return graph;
	}

	var graphs = {
		xp: makeGraph('xp', 'monthly', opts),
		xp_cum: makeGraph('xp_cum', 'monthly', opts),
		xp_stacked: makeGraph('xp_stacked', 'monthly', opts_stacked, 'bar'),
		xp_cum_stacked: makeGraph('xp_cum_stacked', 'monthly', opts_stacked, 'bar'),
		usage: makeGraph('usage', 'monthly', opts)
	};

	/* ************************************
	 *		   chart controls
	 * ************************************/
	// chart selector binding
	$('.chart_selector').on('click touchend', function(e) {
		var $t = $(this), $chart = $('#'+$t.data('chart'));
		$('.chart_holder, .chart_selector').removeClass('active');
		$.post('log_event.php',{
			name: 'Dashboard: Chart ' + $t.data('chart')
		})
		$chart.add($t).addClass('active');
	});
	// time range selector binding (default them to 'monthly')
	$('.data_picker').val('monthly').change(function(e){
		var $t = $(this),
			chartId = $t.data('chart'),
			period = $t.val(),
			graph = graphs[chartId],
			datasetIndeces = Object.keys(graph.data.datasets),
			// get current hidden state
			hiddenState = datasetIndeces.map(function(i) {
				return !graph.isDatasetVisible(i);
			});

		// update data
		graph.data = dataLookup[chartId][period];
		// preserve hidden state accross dataset change
		datasetIndeces.forEach(function(i) {
			graph.getDatasetMeta(i).hidden = hiddenState[i];
		});
		// update the graph
		graph.update();

		e.preventDefault();
	});
});
