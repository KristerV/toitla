
// default route
Router.route('/', function() {
	this.render()
})

Router.route('/orders/:chefHash', function() {
	console.log(this.params.chefHash)
}, {where: 'server'})