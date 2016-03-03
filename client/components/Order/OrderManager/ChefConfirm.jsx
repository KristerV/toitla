ChefConfirm = React.createClass({

    getInitialState() {
        return {
            emailButtonActive: true,
        }
    },

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

    emailDetails() {
        this.setState({emailButtonActive: false})
        Meteor.call('Order--sendDetailsEmail', this.props.orderId, this.props.chef._id)
    },

    updateArray(field, value) {
        Meteor.call('Order--updateChefsArrayField', this.props.orderId, this.props.chef._id, field, value)
    },

    updateAddress(obj) {
        // Update address
        this.updateArray(obj.name, obj.value)
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>
        var chef = this.props.chef
        if (!chef._id) throw new Meteor.Error("Sorry, need chef id in here.. or refactor somehow.")
        var orderId = this.props.orderId
        var confirmed = chef.confirmed
        var declined = chef.declined
        var chefName = this.data.user.profile.name
        var locations = this.data.user.profile.locations
        if (!locations) {
            sAlert.error(`User ${chefName} does not have an address`)
            return <Loader/>
        }
        locations.unshift({address: "Pickup location", _id: null})

        var status

        // Declined
        if (declined) {
            status = <div>
                <h3 className="text-red text-center">Declined</h3>
                <button className="mdl-cell mdl-cell--6-col mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect w100" onClick={this.accept}>Accept instead</button>
            </div>

        // Waiting response
        } else if (!confirmed && !declined) {
            status = <div className="mdl-grid">
                <button className="mdl-cell mdl-cell--6-col mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" onClick={this.decline}>Decline</button>
                <button className="mdl-cell mdl-cell--6-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" onClick={this.accept}>Accept</button>
            </div>

        // Confirmed
        } else {
            status = <div>
                <h4 className="text-green text-center">Accepted</h4>
                {this.state.emailButtonActive ?
                    <button className="mdl-button mdl-js-button mdl-button--colored mdl-button--raised w100" onClick={this.emailDetails}>Send details email</button>
                    :
                    <button className="mdl-button mdl-js-button w100">Email sent</button>
                }
                <button className="mdl-button mdl-js-button mdl-button--colored w100" onClick={this.decline}>Cancel confirmation</button>
            </div>
        }

        return <div className="paper padding" id={chef._id}>
            <h5>{chefName}</h5>
            <TextInput
                label="Ready by"
                name="pickupTime"
                onBlur={this.updateText}
                value={chef.pickupTime}
            />
            <DropDownMUI
                autoWidth={true}
                menuItems={_.map(locations, loc => { return {text: loc.address, value: loc._id} })}
                name="pickupLocation"
                onChange={this.updateAddress}
                value={chef.pickupLocation || null}
            />
            <div className="margin-top"></div>
            <TextInput
                label="Notes"
                name="notes"
                rows={1}
                onBlur={this.updateText}
                value={chef.notes}
            />
            {this.props.allergies ? <p className="text-red"><b>Allergies</b>: {this.props.allergies}</p> : null}
            {status}
        </div>
    }

})
