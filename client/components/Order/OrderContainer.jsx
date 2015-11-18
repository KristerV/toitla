OrderContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders", this.props.orderId)
        var order = Orders.findOne(this.props.orderId)

        // HACK: loading spinner for OrderMenuForm.jsx when price changes
        $('#calculating-price-loader').removeClass('force-visible')

        return {
            order: order,
            subsReady: subscription.ready()
        }
    },

    render() {
        return(<NewOrder order={this.data.order}/>)
    }
})
