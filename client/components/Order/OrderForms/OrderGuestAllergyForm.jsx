OrderGuestAllergyForm = React.createClass({

    submit() {
        var value = $('input[name=guestAllergyInput]').val()
        $('input[name=guestAllergyInput]').val("")
        this.props.order.pushToArray("allergies.guests", value)
        alert(T.order.form.allergies_guest.alert())
    },

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.event = order.event || {}
        return(<div className="paper margin padding">
            <h3>{order.event.eventName}</h3>
            <p>{T.order.form.allergies_guest.text()}</p>
            <TextInput
                name="guestAllergyInput"
                label={T.order.form.allergies_guest.label()}/>
            <button className="mdl-button mdl-js-button mdl-button--accent mdl-button--raised" onClick={this.submit}>
                {T.order.form.allergies_guest.button()}
            </button>
        </div>)
    }
})
