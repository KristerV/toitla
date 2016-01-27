FlowRouter.route('/', {
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(Landing, params.query);
		else {
			if (Roles.userIsInRole(Meteor.userId(), 'manager'))
				FlowRouter.go("stats")
			else
				FlowRouter.go("orders")
		}
	}
});

FlowRouter.route('/home', {
	name: "home",
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

FlowRouter.route('/stats', {
	name: "stats",
	triggersEnter: [loginRequired, managerOnly],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <StatsContainer/>
		});
	}
});

FlowRouter.route('/orders', {
	name: 'orders',
	triggersEnter: [loginRequired, startIdleMonitor],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <OrdersListContainer/>
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

FlowRouter.route('/summary', {
	name: 'summary',
	triggersEnter: [loginRequired, managerOnly],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <SummaryContainer/>
		});
	}
});

FlowRouter.route('/menus', {
	name: 'menus',
	triggersEnter: [loginRequired, managerOnly],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <MenuitemsContainer
						filters={true}
						layout="table"/>
		});
	}
});

FlowRouter.route('/menus/add-item-to-order/:orderId', {
	name: 'menus-addItem',
	triggersEnter: [loginRequired, managerOnly],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <MenuitemsContainer
						filters={true}
						layout="table"
						orderId={params.orderId}
						mode="addMenuitemToOrder"/>
		});
	}
});

FlowRouter.route('/profile/:userId', {
	triggersEnter: [loginRequired, startIdleMonitor],
	name: 'profile',
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <UsersContainer userId={params.userId}/>
		});
	}
});

FlowRouter.route('/menu/:userId', {
	triggersEnter: [loginRequired, startIdleMonitor],
	name: 'menu',
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <MenuitemsContainer chefId={params.userId}/>
		});
	}
});

FlowRouter.route('/login/', {
	name: 'login',
	action: function(params) {
		ReactLayout.render(LoginForm)
	}
});

FlowRouter.route('/login/:token', {
	name: 'login-token',
	action: function(params) {
		Meteor.loginWithToken(params.token, function(err, result){
			if (err) {
				sAlert.error(err.reason)
			}
			window.location.href = Meteor.absoluteUrl()
		})
	}
});

FlowRouter.route('/users/', {
	triggersEnter: [loginRequired, managerOnly],
	name: 'users',
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <UsersContainer/>
		});
	}
});

FlowRouter.route('/scraper/', {
	triggersEnter: [loginRequired, managerOnly],
	action: function(params) {
		ReactLayout.render(Scraper)
	}
});

FlowRouter.route('/neworder/:orderId', {
	name: "neworder",
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(NewOrderContainer, {orderId: params.orderId})
		else
			ReactLayout.render(Layout, {
			content: <NewOrderContainer orderId={params.orderId}/>
		});
	}
});

FlowRouter.route('/submitted/', {
	name: "submitted",
	action: function(params) {
		ReactLayout.render(NewOrderSectionThanks)
	}
});

FlowRouter.route('/order/:orderId', {
	triggersEnter: [loginRequired, startIdleMonitor],
	name: "order",
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(OrderManagerContainer, {orderId: params.orderId})
		else
			ReactLayout.render(Layout, {
			content: <OrderManagerContainer orderId={params.orderId}/>
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

FlowRouter.route('/menuitem/:menuitemId', {
	triggersEnter: [loginRequired, startIdleMonitor],
	name: "menuitem",
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <MenuitemsContainer menuitemId={params.menuitemId}/>
		});
	}
});

FlowRouter.route('/route-denied', {
	name: "route-denied",
	action: function(params) {
		ReactLayout.render(RouteDenied);
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

function managerOnly() {
	if (!Roles.userIsInRole(Meteor.userId(), 'manager')) {
		if (Meteor.isDev)
			sAlert.error("Route not allowed")
		else
			FlowRouter.go("route-denied")
	}
}
