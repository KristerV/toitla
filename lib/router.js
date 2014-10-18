
// default route
Router.route('/', function() {
	this.render('index')
})

Router.route('/order/:orderId', function() {
	Session.set("orderId", this.params.orderId)
	this.render('index')
})

Router.route('/orders/:chefId', function() {
	Accounts.login(this.params.chefId)
	this.render('index')
})