import React from 'react';
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
        order.status = order.status || []
        order.price = order.price || {}
        order.payment = order.payment || {}
        var date = order.event.fromDate ? moment(order.event.fromDate).format("dd D. MMMM") : null

        var className = ""
        if (order.highlightForChef(Meteor.userId())) className += "bg-yellow"
        else if (moment().diff(order.createdAt, 'days') < 2) className += "bg-lightred"
        else if (!order.isSubmitted()) className += "bg-grey"
        else className += "bg-white"

        return(<div className={"mdl-grid paper padding clickable " + className}
            onClick={this.goOrder}>
                <div className="mdl-cell mdl-cell--3-col">
                    {order.payment.name || order.contact.organization || order.contact.name}
                </div>
                <div className="mdl-cell mdl-cell--3-col">
                    {order.event.eventType || order.event.eventName}
                </div>
                <div className="mdl-cell mdl-cell--2-col">
                    {date}
                </div>
                <div className="mdl-cell mdl-cell--2-col">
                    <StatusBar statuses={order.status} result={order.result}/>
                </div>
                <div className="mdl-cell mdl-cell--1-col">
                <button className="mdl-button mdl-js-button mdl-button--icon" onClick={this.deleteOrder}>
                    <i className="material-icons">delete</i>
                </button>
                </div>
            </div>)
    }
})
