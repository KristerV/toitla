OrdersContainer = React.createClass({

    getInitialState() {
        return {
            showAllOrders: false,
        }
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription
        var orders

        if (this.props.orderId) {
            subscription = Meteor.subscribe("orders", this.props.orderId)
            orders = Orders.find(this.props.orderId).fetch()
        } else {
            subscription = Meteor.subscribe("orders")
            var find = {}
            if (!this.state.showAllOrders)
                find["status.phase"] = {$nin: ['done', 'lost']}
            orders = Orders.find(find, {sort: {"event.fromDate": 1, "event.fromTime": 1}}).fetch()
        }

        return {
            orders: orders,
            subsReady: subscription.ready()
        }
    },

    switchShowAll() {
        this.setState({showAllOrders: !this.state.showAllOrders})
    },

    render() {
        var orders = this.data.orders
        var ordersList = []
        orders.forEach(function(order){
            ordersList.push(<div key={order._id}>
                <OrderThumbnail order={order}/>
            </div>)
        })
        return(<div className="max-width paper">
            <Checkbox
                className="margin"
                checked={this.state.showAllOrders}
                onChange={this.switchShowAll}
                label="Show all orders"
            />
            {ordersList}
        </div>)
    }
})
