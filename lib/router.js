
// default route
Router.route('/', function() {
	this.render('index')
})

Router.route('/order/:chefHash', function() {
	Session.set("orderId", this.params.chefHash)
	this.render('index')
})