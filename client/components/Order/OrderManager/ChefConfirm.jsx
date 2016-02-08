ChefConfirm = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var user = Meteor.users.findOne(this.props.chef._id, {fields: {profile: 1}})
        return {
            subsReady: subscription.ready(),
            user: user,
        }
    },

    updateText(e, reactId, event) {
        var value = e.target.value
        var name = e.target.name
        this.updateArray(name, value)
    },

    decline(e, reactId, event) {
        this.updateArray('declined', true)
    },

    accept(e, reactId, event) {
        this.updateArray('confirmed', true)
        this.updateArray('declined', false)
    },

    updateArray(field, value) {
        Meteor.call('Order--updateChefsArrayField', this.props.orderId, this.props.chef._id, field, value)
    },

    render() {
        var chef = this.props.chef
        if (!chef._id) throw new Meteor.Error("Sorry, need chef id in here.. or refactor somehow.")
        var orderId = this.props.orderId
        var confirmed = chef.confirmed
        var declined = chef.declined
        var chefName = this.data.user.profile.name

        // Declined
        if (declined) {
            return <div className="paper padding">
                <h5>{chefName}</h5>
                <h5 className="text-red">Declined</h5>
                <button className="mdl-cell mdl-cell--6-col mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect" onClick={this.accept}>Accept instead</button>
            </div>

        // Waiting response
        } else if (!confirmed && !declined) {
            return <div className="mdl-grid paper">
                <h5 className="mdl-cell mdl-cell--12-col">{chefName}</h5>
                <button className="mdl-cell mdl-cell--6-col mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" onClick={this.decline}>Decline</button>
                <button className="mdl-cell mdl-cell--6-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" onClick={this.accept}>Accept</button>
            </div>
        }

        // Confirmed
        return <div className="paper padding">
            <h5>{chefName}</h5>
            <TextInput
                label="Pickup time"
                name="pickupTime"
                onBlur={this.updateText}
                value={chef.pickupTime}
            />
            <TextInput
                label="Pickup place"
                name="pickupPlace"
                onBlur={this.updateText}
                value={chef.pickupPlace}
            />
            <TextInput
                label="Notes"
                name="notes"
                rows={1}
                onBlur={this.updateText}
                value={chef.notes}
            />
            <button className="mdl-button mdl-js-button mdl-button--colored" onClick={this.decline}>Cancel confirmation</button>
        </div>
    }

})
