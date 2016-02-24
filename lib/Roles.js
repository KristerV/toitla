Roles.isManager = (userId) => {
    if (!userId) userId = Meteor.userId()
    return Roles.userIsInRole(userId, 'manager')
}

Roles.isChef = (userId) => {
    if (!userId) userId = Meteor.userId()
    return Roles.userIsInRole(userId, 'chef')
}

Roles.isDriver = (userId) => {
    if (!userId) userId = Meteor.userId()
    let tab = FlowRouter.current().params.tab
    return tab === 'driver' && !userId
}