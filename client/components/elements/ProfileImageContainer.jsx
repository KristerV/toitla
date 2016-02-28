ProfileImageContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var user = Meteor.users.findOne(this.props.userId)

        return {
            user: user,
            subsReady: subscription.ready()
        }
    },

    render() {
        if (this.data.subsReady)
            return (<ProfileImage user={this.data.user} dpr={this.props.dpr}/>)
        else
            return(<Loader/>)
    }

})