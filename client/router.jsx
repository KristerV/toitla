FlowRouter.goSilent = function(a, b) {
	var path = FlowRouter.path(a, b)
	FlowRouter.redirect(path);
}

FlowRouter.route('/', {
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(Landing, params.query);
		else {
			waitForRoles(function(){
				if (Roles.userIsInRole(Meteor.userId(), 'manager')) {
					FlowRouter.goSilent("stats")
				} else if (!Meteor.user().profile || !Meteor.user().profile.name) {
					FlowRouter.goSilent("profile")
				} else {
					FlowRouter.goSilent("orders")
				}
			})
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

FlowRouter.route('/settings', {
	name: "settings",
	triggersEnter: [loginRequired, managerOnly],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <SettingsContainer/>
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
	}
});

FlowRouter.route('/menus', {
	name: 'menus',
	triggersEnter: [loginRequired, managerOnly],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <MenuitemsContainer filters={true} layout="table"/>
		});
	}
});

FlowRouter.route('/menus/add-item-to-order/:orderId', {
	name: 'menus-addItem', // find and replace if needs changing
	triggersEnter: [loginRequired, managerOnly],
	action: function(params) {
		ReactLayout.render(Layout, {
			content: <MenuitemsContainer filters={true} layout="table" orderId={params.orderId}/>
		});
	}
});

FlowRouter.route('/profile', {
	triggersEnter: [loginRequired],
	action: function(params) {
		FlowRouter.goSilent('profile', {userId: Meteor.userId()})
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
	name: "order",
	action: function(params) {
		waitForRoles(function(){
			if (Roles.userIsInRole(Meteor.userId(), 'manager'))
				FlowRouter.goSilent("orderTab", {orderId: params.orderId, tab: Settings.order.tabs[0].route})
			else
				ReactLayout.render(Layout, {
					content: <OrderManagerContainer orderId={params.orderId}/>
				});
		})
	}
});

FlowRouter.route('/order/:orderId/:tab', {
	triggersEnter: [loginRequired, startIdleMonitor],
	name: "orderTab",
	action: function(params) {
		if (!Meteor.userId())
			ReactLayout.render(OrderManagerContainer, {orderId: params.orderId})
		else {
			ReactLayout.render(Layout, {
				content: <OrderManagerContainer orderId={params.orderId} tab={params.tab}/>,
				tabs: Settings.order.tabs,
				navbarBottom: <StatusBarContainer orderId={params.orderId}/>,
				activeTab: params.tab
			});
		}
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

FlowRouter.route('/discourse_sso', {
	name: "discourse_sso",
	action: function(params) {
		var sig = params.query.sig
		var sso = params.query.sso
		var userId = Meteor.userId()
		Meteor.call("discourseSSO", userId, sso, sig, function(err, result) {
			if (err || !result)
				ReactLayout.render(DiscourseSSO, {error: err});
			else {
				window.location.replace("http://spice.toitla.com/session/sso_login?"+result)
			}
		})
	}
});

function loginRequired(context) {
	if (!Meteor.userId())
		FlowRouter.goSilent("/login")
}

function startIdleMonitor() {
	Deps.autorun(function(c){
	    try {
	        UserStatus.startMonitor({threshold: 30000,interval:5000,idleOnBlur:true});
	    } catch(err) {}
	})
}

function managerOnly() {
	waitForRoles(function(){
		if (!Roles.userIsInRole(Meteor.userId(), 'manager')) {
			if (Meteor.isDev)
				sAlert.error("Route not allowed")
			else
				FlowRouter.goSilent("route-denied")
		}
	})
}

function waitForRoles(callback) {
	if (!Roles.subscription.ready()) {
		Meteor.setTimeout(function(){
			 waitForRoles(callback)
		}, 100);
	} else {
		callback()
	}
}
