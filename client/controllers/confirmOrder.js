Template.confirmOrder.rendered = function() {
	$('.order-range').jRange({
	    from: 1,
	    to: 5,
	    step: 1,
	    scale: [1, 3, 5, 10, 25],
	    format: '%s',
	    showLabels: true,
	    isRange: true,
	});
}