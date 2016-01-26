NewOrderContainer = React.createClass({

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
        if (this.data.subsReady)
            return(<NewOrder order={this.data.order}/>)
        else
            return <Loader/>
    }
})
