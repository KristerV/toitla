Template.layout.rendered = function() {
	Scroller.findPanels()
	Scroller.animateScroll(Scroller.scrollPanels[1])
}
$(window)
	.scroll(function(){
		Scroller.saveScroll()
	})
	.on("scrollstop", function() {
		Scroller.doScroll()
	})
	.resize(function(){
		console.log("resize")
		Scroller.findPanels()
		Scroller.doScroll()
	})