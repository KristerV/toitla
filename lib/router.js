
// default route
Router.route('/', function() {
	this.render('index')
})

Router.route('/order/:orderId', function() {
	var orderId = this.params.orderId

	Meteor.subscribe("order", function() {
		var order = OrderCollection.findOne(orderId)
		if (!order) {
			Session.set("orderId", null)
			this.redirect("/")
		}
	}.bind(this));

	Session.set('orderId', orderId)
	this.render('index')
})

Router.route('/chef/:chefId', function() {
	//Accounts.login(this.params.chefId)
	Session.set('showLogin', this.params.chefId)
	this.render('index')
})