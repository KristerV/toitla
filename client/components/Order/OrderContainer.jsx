OrderContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders", this.props.orderId)
        var order = Orders.findOne(this.props.orderId)

        return {
            order: order,
            subsReady: subscription.ready()
        }
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>
        var order = this.data.order
        return(<div>
                <OrderContactForm order={order}/>
                <OrderEventForm order={order}/>
                <OrderAllergiesForm order={order}/>
                <OrderFinishForm order={order} label="Extra info" textKey="Final word by client"/>
                <OrderMenuForm order={order}/>
            </div>)
    }
})
