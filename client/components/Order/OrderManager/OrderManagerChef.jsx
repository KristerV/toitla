OrderManagerChef = React.createClass({

    render() {
        var order = this.props.order || {}
        order.errors = order.errors || {}

        if (!_.isEmpty(order.allergies.guests)) {
            var allergies = order.allergies.host + ' - ' + order.allergies.guests.join(" - ")
        }

        return(<div className="margin-top mdl-grid">
            <div className="paper max-width padding mdl-cell--6-col">
                <TextInput
                    label={T("order", "event_type")}
                    disabled={true}
                    value={order.event.eventType}/>
                <TextInput
                    label={T("order", "from_date")}
                    disabled={true}
                    value={moment(order.event.fromDate).format('DD. MMMM YYYY')}/>
                <TextInput
                    label={T("order", "from_time")}
                    disabled={true}
                    value={moment(order.event.fromTime).format('HH:mm')}/>
                <TextInput
                    label="Order phase"
                    disabled={true}
                    value={order.status.phase}/>
                <p>Allergies</p>
                <p className="text-red">{allergies}</p>
            </div>
            <div className="margin-top max-width">
                <MenuitemsContainer orderId={order._id} layout="table" />
            </div>
        </div>)
    }
})
