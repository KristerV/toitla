Roles.isManager = (userId) => {
    if (!userId) userId = Meteor.userId()
    return Roles.userIsInRole(userId, 'manager')
}

Roles.isChef = (userId) => {
    if (!userId) userId = Meteor.userId()
    return Roles.userIsInRole(userId, 'chef')
}