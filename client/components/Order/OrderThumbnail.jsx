OrderThumbnail = React.createClass({

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
        order.price = order.price || {}
        var date = order.event.fromDate ? moment(order.event.fromDate).format("D. MMMM") : null
        var className = ""
        if (order.status.phase === "lost") className += "bg-red"
        else if (order.status.phase === "done") className += "bg-green"
        else if (order.status.phase === "unsubmitted") className += "bg-grey"
        else className += "bg-white"
        return(<div className={"mdl-grid paper padding clickable " + className}
            onClick={this.goOrder}>
                <div className="mdl-cell mdl-cell--3-col">
                    {order.contact.organization || order.contact.name}
                </div>
                <div className="mdl-cell mdl-cell--4-col">
                    {order.event.eventName}
                </div>
                <div className="mdl-cell mdl-cell--1-col">
                    {order.price.custom}€
                </div>
                <div className="mdl-cell mdl-cell--2-col">
                    {date}
                </div>
                <div className="mdl-cell mdl-cell--1-col">
                    {order.status.phase}
                </div>
                <div className="mdl-cell mdl-cell--1-col">
                <button className="mdl-button mdl-js-button mdl-button--icon" onClick={this.deleteOrder}>
                    <i className="material-icons">delete</i>
                </button>
                </div>
            </div>)
    }
})
