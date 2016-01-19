UsersContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var users = Meteor.users.find({}, {sort: {'status.lastLogin.date': -1}}).fetch()
        return {
            subsReady: subscription.ready(),
            users: users,
        }
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>

        if (this.props.userId)
            return <UserProfile/>

        return(<UsersTable users={this.data.users}/>)
    }
})
