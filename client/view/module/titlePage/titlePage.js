Template.titlePage.helpers({
	invisible: function() {
		var scroll = Session.get('panel-center-scroll')
		var hideHeight = $(window).height() * 0.2
		return scroll > hideHeight ? 'opacity-none' : ''
	}
})