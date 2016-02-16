StatusBarContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders")
        return {
            subsReady: subscription.ready(),
            order: Orders.findOne(this.props.orderId)
        }
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>
        return <StatusBar statuses={this.data.order.status} result={this.data.order.result}/>
    }
})
