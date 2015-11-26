FlowRouter.route('/', {
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(Landing, params.query);
		else
			FlowRouter.go("orders")
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

FlowRouter.route('/orders', {
	name: 'orders',
	triggersEnter: [loginRequired, startIdleMonitor],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <Overview/>
		});
		Meteor.setTimeout(function(){
			if (window.location.href.indexOf("toitla.com:3000") > -1) {
				sAlert.warning("This server is for development only.")
			} else if (!Meteor.user().profile || !Meteor.user().profile.name) {
				sAlert.info('Palun täida oma profiil ära, siis saame sulle tellimusi saata.', {timeout: 10000})
			}
		}, 2000);
	}
});

FlowRouter.route('/profile/:userId', {
	triggersEnter: [loginRequired, startIdleMonitor],
	name: 'profile',
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <ProfileForm userId={params.userId}/>
		});
	}
});

FlowRouter.route('/menu/:userId', {
	name: 'menu',
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <MenuItemsContainer chefId={params.userId}/>
		});
	}
});

FlowRouter.route('/login/', {
	name: 'login',
	action: function(params) {
		ReactLayout.render(LoginForm)
	}
});

FlowRouter.route('/users/', {
	name: 'users',
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <UsersContainer/>
		});
	}
});

FlowRouter.route('/scraper/', {
	triggersEnter: [loginRequired],
	action: function(params) {
		ReactLayout.render(Scraper)
	}
});

FlowRouter.route('/order/:orderId', {
	name: "order",
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(OrderContainer, {orderId: params.orderId})
		else
			ReactLayout.render(Layout, {
			content: <OrderContainer orderId={params.orderId}/>
		});
	}
});

FlowRouter.route('/allergy/:allergyId', {
	name: "guestAllergy",
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(GuestAllergyContainer, {allergyId: params.allergyId})
		else
			ReactLayout.render(Layout, {
			content: <GuestAllergyContainer allergyId={params.allergyId}/>
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
