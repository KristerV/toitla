
var {
    List,
    ListItem,
    Styles,
} = MUI;

ChefsList = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        return {
            users: Meteor.users.find({
                'profile.name': {$exists: true, $ne: ''},
                'roles': 'chef',
                'profile.companyCode': {$ne: null, $ne: ''},
                'profile.vet': true,
            }).fetch(),
            // subsReady: subscription.ready()
        }
    },

    addUserToSuborder(chefId, e) {
        if (this.props.suborder) {
            this.props.suborder.addUserToSuborder(chefId)
            this.props.closeDialog()
        }
    },

    render() {
        var chefs = this.data.users
        var suborder = this.props.suborder
        return(<List>
            {chefs.map(function(chef){
                console.log(chef.profile);

                var statusClass = 'status-'+chef.getStatus()
                var statusDot = <span style={{"font-size":"2em", "vertical-align": "middle"}} className={statusClass}>•</span>
                var result = suborder.chefs[chef._id] ? suborder.chefs[chef._id].result : ''
                if (result == 'declined')
                    var result = <span className="warning-text">{result}</span>
                else if (result == 'accepted')
                    var result = <span className="success-text">{result}</span>
                return <ListItem
                    key={chef._id}
                    onClick={this.addUserToSuborder.bind(this, chef._id)}
                    primaryText={<p>{statusDot} {chef.profile.name}</p>}
                    secondaryText={<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{result}</p>}
                    />
            }.bind(this))}
        </List>)
    }
})
