OrderGuestAllergyForm = React.createClass({

    submit() {
        var value = $('input[name=guestAllergyInput]').val()
        $('input[name=guestAllergyInput]').val("")
        this.props.order.pushToArray("allergies.guests", value)
        alert(T("allergy_submit"))
    },

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.event = order.event || {}
        return(<div className="paper margin padding">
            <h3>{order.event.eventName}</h3>
            <p>{T("order", "allergies_guest")}</p>
            <TextInput
                name="guestAllergyInput"
                label={T("order", "allergies_label_guest")}/>
            <button className="mdl-button mdl-js-button mdl-button--accent mdl-button--raised" onClick={this.submit}>
                {T("order","guest_allergy_button")}
            </button>
        </div>)
    }
})
