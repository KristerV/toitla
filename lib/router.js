
// default route
Router.route('/', function() {
	this.render('index')
})

Router.route('/orders/:chefHash', function() {
	console.log(this.params.chefHash)
}, {where: 'server'})