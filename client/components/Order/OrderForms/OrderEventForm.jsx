import React from 'react';
OrderEventForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },

    handlePeopleCountChange(e) {
        this.props.order.handleTextFieldChange(e)
    },

    handleFromDateChange(nill, date) {
        this.props.order.updateField('event.fromDate', date)
    },

    handleFromTimeChange(nill, date) {
        this.props.order.updateField('event.fromTime', date)
    },

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.event = order.event || {}
        order.errors = order.errors || {}
        order.errors.event = order.errors.event || {}

        // Delay between today and possible to order
        var minimumDate = Roles.isManager() ? new Date(0) : moment().add(Settings.minimum_days_notice, 'days').toDate()

        return(<div className="paper margin padding">
            <Loader ifNot={order.event}/>
            <TextInput
                label={T.order.form.event.event_type()}
                name="event.eventType"
                onBlur={this.handleTextFieldChange}
                value={order.event.eventType}
                errorMsg={order.errors.event.eventType} />
            <TextInput
                label={T.order.form.event.nrPeople()}
                name="event.peopleCount"
                onBlur={this.handlePeopleCountChange}
                value={order.event.peopleCount}
                patternTemplate="float"
                patternError={T.order.form.event.nrPeople_patternError()}
                errorMsg={order.errors.event.peopleCount} />
            <TextInput
                label={T.order.form.event.location()}
                name="event.location"
                onBlur={this.handleTextFieldChange}
                value={order.event.location}
                errorMsg={order.errors.event.location} />
            <DatePickerMUI
                label={T.order.form.event.date()}
                minDate={minimumDate}
                onChange={this.handleFromDateChange}
                name="event.fromDate"
                defaultDate={order.event.fromDate}
                autoOk={true}
                errorMsg={order.errors.event.fromDate} />
            <TimePickerMUI
                label={T.order.form.event.time()}
                onChange={this.handleFromTimeChange}
                value={order.event.fromTime}
                name="event.fromTime"
                errorMsg={order.errors.event.fromTime} />

        </div>)
    }
})
