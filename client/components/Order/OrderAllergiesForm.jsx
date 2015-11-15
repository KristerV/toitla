OrderAllergiesForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },

    generateAllergiesLink() {
        var url = Meteor.absoluteUrl()
        var path = FlowRouter.path("guestAllergy", {allergyId: this.props.order.allergies._id})
        var link = url.slice(0, -1) + path
        return link
    },

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        var shareLink = this.generateAllergiesLink()

        if (!_.isEmpty(order.allergies.guests)) {
            var guestsAllergies = <div>
                <h5>{T("order", "allergies_guests_submitted")}</h5>
                <p>{order.allergies.guests.join(" - ")}</p>
            </div>
        }

        return(<div className="paper margin padding">
            <TextInput
                label={T("order", "allergies_label")}
                name="allergies.host"
                onBlur={this.handleTextFieldChange}
                value={order.allergies.host}
                errorMsg={order.errors['allergies.host']} />
            <h5>{T("order", "or_share_link")}</h5>
            <a target="_blank" href={shareLink}>{shareLink}</a>
            {guestsAllergies}
        </div>)
    }
})
