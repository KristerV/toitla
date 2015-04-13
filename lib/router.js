Router.configure({
})

Router.route('/', function() {
	this.render()
})

Router.route('/secretaccesstooallthesexyinformationwehavebutyoucanactuallyseepubliclyifonlyyouknowmeteor', function() {
	Session.set('sexysecrets', true)
})
