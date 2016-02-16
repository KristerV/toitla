OrderListItem = React.createClass({

    deleteOrder(e) {
        this.props.order.delete()
        e.stopPropagation()
    },

    goOrder() {
        FlowRouter.go("order", {orderId: this.props.order._id})
    },

    render() {
        var order = this.props.order
        order.event = order.event || {}
        order.contact = order.contact || {}
        order.status = order.status || {}
        order.price = order.price || {}
        var date = order.event.fromDate ? moment(order.event.fromDate).format("dd D. MMMM") : null

        var className = ""
        if (order.status.phase === "lost") className += "bg-red"
        else if (order.status.phase === "silent") className += "bg-lightred"
        else if (order.status.phase === "done") className += "bg-green"
        else if (!order.isSubmitted()) className += "bg-grey"
        // if chef is in order and phase is far enough in the process
        else if (_.contains(Settings.getVisibleMenuitemsForChef(), order.status.phase)) className += "bg-yellow"
        else className += "bg-white"

        return(<div className={"mdl-grid paper padding clickable " + className}
            onClick={this.goOrder}>
                <div className="mdl-cell mdl-cell--3-col">
                    {order.contact.organization || order.contact.name}
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                    {order.event.eventName || order.event.eventType}
                </div>
                <div className="mdl-cell mdl-cell--2-col">
                    {date}
                </div>
                <div className="mdl-cell mdl-cell--2-col">
                    <StatusBar statuses={order.status}/>
                </div>
                <div className="mdl-cell mdl-cell--1-col">
                <button className="mdl-button mdl-js-button mdl-button--icon" onClick={this.deleteOrder}>
                    <i className="material-icons">delete</i>
                </button>
                </div>
            </div>)
    }
})
