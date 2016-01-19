UsersContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        if (this.props.userId)
            var user = Meteor.users.findOne({_id: this.props.userId})
        else
            var users = Meteor.users.find({}, {sort: {'status.lastLogin.date': -1}}).fetch()
        return {
            subsReady: subscription.ready(),
            users: users,
            user: user
        }
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>

        if (this.data.user)
            return <UserProfile user={this.data.user}/>

        return(<UsersTable users={this.data.users}/>)
    }
})
