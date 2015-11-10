OrderEventForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },
    render() {
        // if (!this.props.order)
        //     return(<Loader/>)
        var order = this.props.order
        // order.errors = order.errors || {}
        return(<div className="paper margin padding">
            <Loader ifNot={order.event}/>
            <TextInput
                label=T("people_count")
                name="event.peopleCount"
                onBlur={this.handleTextFieldChange}
                value={order.event.peopleCount}
                errorMsg={order.errors['event.peopleCount']} />
            <TextInput
                label=T("location")
                name="event.location"
                onBlur={this.handleTextFieldChange}
                value={order.event.location}
                errorMsg={order.errors['event.location']} />
            <TextInput
                label=T("from_date")
                name="event.fromDate"
                onBlur={this.handleTextFieldChange}
                value={order.event.fromDate}
                errorMsg={order.errors['event.fromDate']} />
            <TextInput
                label=T("from_time")
                name="event.fromTime"
                onBlur={this.handleTextFieldChange}
                value={order.event.fromTime}
                errorMsg={order.errors['event.fromTime']} />
            <TextInput
                label=T("event_type")
                name="event.eventType"
                onBlur={this.handleTextFieldChange}
                value={order.event.eventType}
                errorMsg={order.errors['event.eventType']} />

        </div>)
    }
})
