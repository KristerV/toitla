FlowRouter.route('/', {
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(Landing, params.query);
		else
			FlowRouter.go("/ylevaade")
	}
});

FlowRouter.route('/home', {
	action: function(params) {
		if (Meteor.userId()) {
			ReactLayout.render(Layout, {
				content: <Landing/>
			});
		} else {
			ReactLayout.render(Landing, params.query);
		}
	}
});

FlowRouter.route('/ylevaade', {
	triggersEnter: [loginRequired, startIdleMonitor],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <Overview/>
		});
	}
});

FlowRouter.route('/profiil', {
	triggersEnter: [loginRequired, startIdleMonitor],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <ProfileForm/>
		});
	}
});

FlowRouter.route('/login/', {
	action: function(params) {
		ReactLayout.render(LoginForm)
	}
});

FlowRouter.route('/telli/', {
	action: function(params) {
		var orderId = Order.createOrder(function(err, result){
			if (err)
				sAlert.error(err)
			FlowRouter.go("/tellimus/"+result)
		})
	}
});

FlowRouter.route('/tellimus/:orderId', {
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(OrderForm, {orderId: params.orderId})
		else
			ReactLayout.render(Layout, {
			content: <OrderForm orderId={params.orderId}/>
		});
	}
});

FlowRouter.route('/alatellimus/:suborderId', {
	triggersEnter: [loginRequired, startIdleMonitor],
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(OrderForm, {orderId: params.orderId})
		else
			ReactLayout.render(Layout, {
			content: <SuborderItem suborderId={params.suborderId}/>
		});
	}
});

function loginRequired(context) {
	if (!Meteor.userId())
		FlowRouter.go("/login")
}

function startIdleMonitor() {
	Deps.autorun(function(c){
	    try {
	        UserStatus.startMonitor({threshold: 30000,interval:5000,idleOnBlur:true});
	    } catch(err) {}
	})
}
