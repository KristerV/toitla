var {
    Paper,
    DropDownMenu,
    Checkbox,
    DatePicker,
    TimePicker,
    TextField,
    RaisedButton,
    RadioButton,
    RadioButtonGroup,
    Styles,
} = MUI;

DetailsForm = React.createClass({

    getInitialState() {
        return {
            isFormValid: false
        }
    },

    handlePeopleCountChange(e) {
        var val = parseInt(e.target.value)
        if (val && val < Settings.minimum_people_count) {
            this.setState({'details.peopleCount': "Teenindame vaid gruppe alates "+Settings.minimum_people_count+" inimest."})
        } else {
            this.setState({'details.peopleCount': null})
        }
        Meteor.call('menuitemInOrder--refreshOrder', this.props.order._id)
    },

    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
        this.props.order.calculatePrice()
    },

    handleFromDateChange(nill, date) {
        this.props.order.updateField('details.fromDate', date)
        this.props.order.calculatePrice()
    },

    handleFromTimeChange(nill, date) {
        this.props.order.updateField('details.fromTime', date)
        this.props.order.calculatePrice()
    },

    handleToTimeChange(nill, date) {
        this.props.order.updateField('details.toTime', date)
        this.props.order.calculatePrice()
    },

    handleChangeCheckbox(e, checked) {
        this.props.order.handleChangeCheckbox(e, checked)
        this.props.order.calculatePrice()
    },

    handleRadioChange(e, selected) {
        this.props.order.handleRadioChange(e, selected)
        this.props.order.calculatePrice()
    },

    handleSubmit: function(e) {
        e.preventDefault()
        this.props.order.submitForm(this)
    },

    getDateFormat: function(date) {
        if (!date) return null
        return moment(date).format('D. MMMM')
    },

    getTimeFormat: function(date) {
        if (!date) {
            date = new Date();
            date.setHours(0,0,0,0);
        }
        return moment(date).format('H:mm')
    },

    render() {
        var order = this.props.order
        var userId = Meteor.userId()
        var disabledDetails = !order.allowedEdit(userId, 'details')
        var disabledContact = !order.allowedEdit(userId, 'contact')

        // Delay between today and possible to order
        var minimumDate = moment().add(Settings.minimum_days_notice, 'days').toDate()

        // Submit button
        if (!order.submitted) {
            var submitButton = <RaisedButton
                style={{display: 'block', margin: 'auto', width: '150px'}}
                disabled={disabledDetails}
                type="submit"
                label="Esita tellimus"
                primary={true}/>
          if (order.contact.email && order.details.serviceType) {
            var price =
                <div className="floatingPrice">
                    <div className="wrapper">
                        <p>Kokku</p>
                        <h2>{order.details.calculatedPrice}€</h2>
                    </div>
                </div>
          }
        } else {
            var priceLabel = "Hind (orig: "+order.details.originalPrice+"/ kalk: "+order.details.calculatedPrice+")"
            var price =
                <TextField
                    disabled={disabledDetails}
                    floatingLabelText={priceLabel}
                    name="details.customPrice"
                    onChange={this.handleTextFieldChange}
                    value={order.details.customPrice}/>
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <Paper className="padding margin paper-initial-order">
                    <TextField
                        disabled={disabledDetails}
                        floatingLabelText="Inimeste arv"
                        name="details.peopleCount"
                        onChange={this.handleTextFieldChange}
                        onBlur={this.handlePeopleCountChange}
                        value={order.details.peopleCount}
                        errorText={this.state['details.peopleCount']} />
                    <TextField
                        disabled={disabledDetails}
                        floatingLabelText="Asukoht"
                        name="details.location"
                        onChange={this.handleTextFieldChange}
                        value={order.details.location}
                        errorText={this.state['details.location']} />
                    <DatePicker
                        disabled={disabledDetails}
                        floatingLabelText="Kuupäev"
                        minDate={minimumDate}
                        onChange={this.handleFromDateChange}
                        defaultDate={order.details.fromDate}
                        autoOk={true}
                        formatDate={this.getDateFormat}
                        errorText={this.state['details.fromDate']} />
                    <TimePicker
                        disabled={disabledDetails}
                        floatingLabelText="Kellaaeg"
                        format="24hr"
                        onChange={this.handleFromTimeChange}
                        value={this.getTimeFormat(order.details.fromTime)}
                        errorText={this.state['details.fromTime']} />
                </Paper>
                <Paper className="padding margin paper-initial-order">
                    <TextField
                        disabled={disabledContact}
                        floatingLabelText="Organisatsioon"
                        name="contact.organization"
                        onChange={this.handleTextFieldChange}
                        value={order.contact.organization}
                        errorText={this.state['contact.organization']} />
                    <TextField
                        disabled={disabledContact}
                        floatingLabelText="Kontakti nimi"
                        name="contact.name"
                        onChange={this.handleTextFieldChange}
                        value={order.contact.name}
                        errorText={this.state['contact.name']} />
                    <TextField
                        disabled={disabledContact}
                        floatingLabelText="Telefoni number"
                        name="contact.number"
                        onChange={this.handleTextFieldChange}
                        value={order.contact.number}
                        errorText={this.state['contact.number']} />
                    <TextField
                        disabled={disabledContact}
                        floatingLabelText="E-mail"
                        name="contact.email"
                        onChange={this.handleTextFieldChange}
                        value={order.contact.email}
                        errorText={this.state['contact.email']} />
                </Paper>
                <Paper className="padding margin relative">
                    <RadioButtonGroup name="details.serviceType" onChange={this.handleRadioChange} valueSelected={order.details.serviceType}>
                            <RadioButton
                            value="light"
                            label="Lõuna (kerged suupisted)"
                            style={{marginBottom:16}} />
                            <RadioButton
                            value="heavy"
                            label="Pidusöök (toekamad suupisted)"
                            style={{marginBottom:16}}/>
                            <RadioButton
                            value="catering"
                            label="Catering (teenindaja + kohv/tee)"
                            style={{marginBottom:16}}/>
                    </RadioButtonGroup>
                    {(() => {
                        if (this.state['details.serviceType'])
                            return <p className="warning-text">Palun vali teenuse tüüp</p>
                    })()}
                    {(() => {
                        if (order.details.serviceType === 'catering') {
                            return <div>
                                <TextField
                                    disabled={disabledDetails}
                                    floatingLabelText="Kohvi-/suupistepauside arv"
                                    name="details.mealCount"
                                    onChange={this.handleTextFieldChange}
                                    value={order.details.mealCount}
                                    errorText={this.state['details.mealCount']} />
                                <br/><sub>Palun märgi kohvipauside soovitud kellaajad "Lisainfo" sektsiooni.</sub>
                            </div>
                        }
                    })()}
                    {price}
                </Paper>
                <Paper className="padding margin">
                    <TextField
                        disabled={disabledDetails}
                        className="full-width"
                        floatingLabelText="Mis üritusega on tegemist?"
                        name="details.eventDescription"
                        onChange={this.handleTextFieldChange}
                        value={order.details.eventDescription}/>
                    <TextField
                        disabled={disabledDetails}
                        className="full-width"
                        floatingLabelText="Allergiad"
                        name="details.allergies"
                        onChange={this.handleTextFieldChange}
                        value={order.details.allergies}/>
                    <TextField
                        disabled={disabledDetails}
                        className="full-width"
                        floatingLabelText="Lisainfo"
                        rows={4}
                        multiLine={true}
                        name="details.clientNotes"
                        onChange={this.handleTextFieldChange}
                        value={order.details.clientNotes}/>
                </Paper>
                {submitButton}
            </form>
        );
    }
})
