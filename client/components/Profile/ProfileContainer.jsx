ProfileContainer = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var user = Meteor.users.findOne({_id: this.props.userId})
        return {
            user: user,
            subsReady: subscription.ready(),
        }
    },
    render() {
        if (this.data.subsReady)
            return( <Profile user={this.data.user}/> )
        else
            return(<Loader/>)
    }
})
