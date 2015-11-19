OrderEventForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },

    handlePeopleCountChange(e) {
        this.props.order.handleTextFieldChange(e)
        this.props.order.refreshMenu()
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
        var minimumDate = moment().add(Settings.minimum_days_notice, 'days').toDate()

        return(<div className="paper margin padding">
            <Loader ifNot={order.event}/>
            <TextInput
                label={T("order", "event_name")}
                name="event.eventName"
                onBlur={this.handleTextFieldChange}
                value={order.event.eventName}
                errorMsg={order.errors.event.eventName} />
            <TextInput
                label={T("order", "event_type")}
                name="event.eventType"
                onBlur={this.handleTextFieldChange}
                value={order.event.eventType}
                errorMsg={order.errors.event.eventType} />
            <TextInput
                label={T("order", "people_count")}
                name="event.peopleCount"
                onBlur={this.handlePeopleCountChange}
                value={order.event.peopleCount}
                pattern="-?[0-9]*(\.[0-9]+)?"
                patternError={T("order", "people_count_patternError")}
                errorMsg={order.errors.event.peopleCount} />
            <TextInput
                label={T("order", "location")}
                name="event.location"
                onBlur={this.handleTextFieldChange}
                value={order.event.location}
                errorMsg={order.errors.event.location} />
            <DatePickerMUI
                label={T("order","from_date")}
                minDate={minimumDate}
                onChange={this.handleFromDateChange}
                name="event.fromDate"
                defaultDate={order.event.fromDate}
                autoOk={true}
                errorMsg={order.errors.event.fromDate} />
            <TimePickerMUI
                label={T("order", "from_time")}
                onChange={this.handleFromTimeChange}
                value={order.event.fromTime}
                name="event.fromTime"
                errorMsg={order.errors.event.fromTime} />

        </div>)
    }
})
