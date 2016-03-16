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
        var minimumDate = !Roles.isManager() ? moment().add(Settings.minimum_days_notice, 'days').toDate() : null

        return(<div className="paper margin padding">
            <Loader ifNot={order.event}/>
            <TextInput
                label={T_deprecated("order", "event_name")}
                name="event.eventName"
                onBlur={this.handleTextFieldChange}
                value={order.event.eventName}
                errorMsg={order.errors.event.eventName} />
            <TextInput
                label={T_deprecated("order", "event_type")}
                name="event.eventType"
                onBlur={this.handleTextFieldChange}
                value={order.event.eventType}
                errorMsg={order.errors.event.eventType} />
            <TextInput
                label={T_deprecated("order", "people_count")}
                name="event.peopleCount"
                onBlur={this.handlePeopleCountChange}
                value={order.event.peopleCount}
                patternTemplate="float"
                patternError={T_deprecated("order", "people_count_patternError")}
                errorMsg={order.errors.event.peopleCount} />
            <TextInput
                label={T_deprecated("order", "location")}
                name="event.location"
                onBlur={this.handleTextFieldChange}
                value={order.event.location}
                errorMsg={order.errors.event.location} />
            <DatePickerMUI
                label={T_deprecated("order","from_date")}
                minDate={minimumDate}
                onChange={this.handleFromDateChange}
                name="event.fromDate"
                defaultDate={order.event.fromDate}
                autoOk={true}
                errorMsg={order.errors.event.fromDate} />
            <TimePickerMUI
                label={T_deprecated("order", "from_time")}
                onChange={this.handleFromTimeChange}
                value={order.event.fromTime}
                name="event.fromTime"
                errorMsg={order.errors.event.fromTime} />

        </div>)
    }
})
