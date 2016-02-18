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

        // Update notes from profile settings
        if (!this.props.chef.notes) {
            var notes = ""
            this.data.user.profile.locations.forEach(loc => {
                if (loc._id === obj.value)
                    notes = loc.notes
            })
            this.updateArray("notes", notes)
            var chefId = this.props.chef._id
            $('#' + chefId + ' textarea[name="notes"]').val(notes)
        }
    },

    render() {
        var chef = this.props.chef
        if (!chef._id) throw new Meteor.Error("Sorry, need chef id in here.. or refactor somehow.")
        var orderId = this.props.orderId
        var confirmed = chef.confirmed
        var declined = chef.declined
        var chefName = this.data.user.profile.name
        var locations = this.data.user.profile.locations
        locations.unshift({address: "Pickup location", _id: null})

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
            {this.state.emailButtonActive ?
                <button className="mdl-button mdl-js-button mdl-button--colored mdl-button--raised w100" onClick={this.emailDetails}>Send details email</button>
                :
                <button className="mdl-button mdl-js-button w100">Email sent</button>
            }
            <button className="mdl-button mdl-js-button mdl-button--colored w100" onClick={this.decline}>Cancel confirmation</button>
        </div>
    }

})
