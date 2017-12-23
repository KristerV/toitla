import React from 'react'
import {mount} from 'react-mounter'

FlowRouter.triggers.enter([function () {
    G.setDocumentTitle("Toitla")
    Analytics.event(FlowRouter.current().route.name || FlowRouter.current().path)
}, logTawk])

FlowRouter.goSilent = function (a, b) {
    var path = FlowRouter.path(a, b)
    FlowRouter.redirect(path);
}

FlowRouter.route('/', {
    action: function (params) {
        // Don't show landing, go straight to new order
        Order.createOrder()
        return

        // Old logic continues
        if (!Meteor.userId())
            mount(Landing, params.query);
        else {
            waitForRoles(function () {
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
    action: function (params) {
        if (Meteor.userId()) {
            mount(Layout, {
                content: <Landing/>
            });
        } else {
            mount(Landing, params.query);
        }
    }
});

FlowRouter.route('/stats', {
    name: "stats",
    triggersEnter: [loginRequired, managerOnly],
    action: function (params) {
        mount(Layout, {
            content: <StatsContainer/>
        });
    }
});

FlowRouter.route('/settings', {
    name: "settings",
    triggersEnter: [loginRequired, managerOnly],
    action: function (params) {
        FlowRouter.goSilent("settingsTab", {tab: 'checklists'})
    }
});

FlowRouter.route('/settings/:tab', {
    name: "settingsTab",
    triggersEnter: [loginRequired, managerOnly],
    action: function (params) {
        mount(Layout, {
            content: <SettingsContainer tab={params.tab}/>,
            tabs: Settings.settings.tabs,
            activeTab: params.tab
        });
    }
});

FlowRouter.route('/orders', {
    name: 'orders',
    triggersEnter: [loginRequired, startIdleMonitor],
    action: function (params) {
        mount(Layout, {
            content: <OrdersListContainer/>
        });
    }
});

FlowRouter.route('/menus', {
    name: 'menus',
    triggersEnter: [loginRequired, managerOnly],
    action: function (params) {
        mount(Layout, {
            content: <MenuitemsContainer filters={true} layout="table"/>
        });
    }
});

FlowRouter.route('/menus/add-item-to-order/:orderId', {
    name: 'menus-addItem', // find and replace if needs changing
    triggersEnter: [loginRequired, managerOnly],
    action: function (params) {
        mount(Layout, {
            content: <MenuitemsContainer filters={true} layout="table" orderId={params.orderId}/>
        });
    }
});

FlowRouter.route('/profile', {
    triggersEnter: [loginRequired],
    action: function (params) {
        FlowRouter.goSilent('profile', {userId: Meteor.userId()})
    }
});

FlowRouter.route('/profile/:userId', {
    triggersEnter: [loginRequired, startIdleMonitor],
    name: 'profile',
    action: function (params) {
        mount(Layout, {
            content: <UsersContainer userId={params.userId}/>
        });
    }
});

FlowRouter.route('/menu/:userId', {
    triggersEnter: [loginRequired, startIdleMonitor],
    name: 'menu',
    action: function (params) {
        mount(Layout, {
            content: <MenuitemsContainer chefId={params.userId}/>
        });
    }
});

FlowRouter.route('/login/', {
    name: 'login',
    action: function (params) {
        if (Meteor.userId())
            FlowRouter.go('/')
        else
            mount(LoginForm)
    }
});

FlowRouter.route('/login/:token', {
    name: 'login-token',
    action: function (params) {
        Meteor.loginWithToken(params.token, function (err, result) {
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
    action: function (params) {
        mount(Layout, {
            content: <UsersContainer/>
        });
    }
});

FlowRouter.route('/scraper/', {
    triggersEnter: [loginRequired, managerOnly],
    action: function (params) {
        mount(Scraper)
    }
});

FlowRouter.route('/neworder', {
    name: "neworder-noid",
    action: function (params) {
        Order.createOrder()
    }
});

FlowRouter.route('/neworder/:orderId', {
    name: "neworder",
    action: function (params) {
        if (!Meteor.userId())
            mount(NewOrderContainer, {orderId: params.orderId})
        else
            mount(Layout, {
                content: <NewOrderContainer orderId={params.orderId}/>
            });
    }
});

FlowRouter.route('/submitted/', {
    name: "submitted",
    action: function (params) {
        mount(NewOrderSectionThanks)
    }
});

FlowRouter.route('/order/:orderId', {
    name: "order",
    action: function (params) {
        waitForRoles(function () {
            if (Roles.userIsInRole(Meteor.userId(), 'manager'))
                FlowRouter.goSilent("orderTab", {orderId: params.orderId, tab: Settings.order.tabs[0].route})
            else
                mount(Layout, {
                    content: <OrderManagerContainer orderId={params.orderId}/>
                });
        })
    }
});

FlowRouter.route('/order/:orderId/:tab', {
    name: "orderTab",
    action: function (params) {

        // Driver may see info
        // params.tab === 'driver' && !Meteor.userId()
        if (Roles.isDriver()) {
            mount(OrderManagerContainer, {orderId: params.orderId, tab: 'driver'})
            return
        }

        loginRequired()
        managerOnly()

        mount(Layout, {
            content: <OrderManagerContainer orderId={params.orderId} tab={params.tab}/>,
            tabs: Settings.order.tabs,
            navbarBottom: <StatusBarContainer orderId={params.orderId}/>,
            activeTab: params.tab
        });
    }
});

FlowRouter.route('/allergy/:allergyId', {
    name: "guestAllergy",
    action: function (params) {
        if (!Meteor.userId())
            mount(GuestAllergyContainer, {allergyId: params.allergyId})
        else
            mount(Layout, {
                content: <GuestAllergyContainer allergyId={params.allergyId}/>
            });
    }
});

FlowRouter.route('/menuitem/:menuitemId', {
    triggersEnter: [loginRequired, startIdleMonitor],
    name: "menuitem",
    action: function (params) {
        mount(Layout, {
            content: <MenuitemsContainer menuitemId={params.menuitemId}/>
        });
    }
});

FlowRouter.route('/route-denied', {
    name: "route-denied",
    action: function (params) {
        mount(RouteDenied);
    }
});

FlowRouter.route('/discourse_sso', {
    name: "discourse_sso",
    action: function (params) {
        var sig = params.query.sig
        var sso = params.query.sso
        var userId = Meteor.userId()
        Meteor.call("discourseSSO", userId, sso, sig, function (err, result) {
            if (err || !result)
                mount(DiscourseSSO, {error: err});
            else {
                window.location.replace("http://spice.toitla.com/session/sso_login?" + result)
            }
        })
    }
});

function loginRequired(context) {
    if (!Meteor.userId())
        FlowRouter.goSilent("/login")
}

function startIdleMonitor() {
    Deps.autorun(function (c) {
        try {
            UserStatus.startMonitor({threshold: 30000, interval: 5000, idleOnBlur: true});
        } catch (err) {
        }
    })
}

function managerOnly() {
    waitForRoles(function () {
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
        Meteor.setTimeout(function () {
            waitForRoles(callback)
        }, 100);
    } else {
        callback()
    }
}

function logTawk() {
    if (!window.Tawk_API) {
        Meteor.setTimeout(logTawk, 1000)
    } else {
        window.Tawk_API.setAttributes({'current-route': G.getFullUrl()})
    }
}