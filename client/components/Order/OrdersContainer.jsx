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

    goNewOrder(e) {
        Order.createOrder()
    },

    render() {
        var user = Meteor.user()
        if (!user || !user.isManager()) {
            return (<h4 style={{color: "white"}}>Tellimusi siia veel ei tule (moodul arendamisel). Seniks võid oma menüü ja profiili ära täita, sest täidame tellimusi käsitsi!</h4>)
        }
        var orders = this.data.orders
        var ordersList = []
        orders.forEach(function(order){
            ordersList.push(<div key={order._id}>
                <OrderListItem order={order}/>
            </div>)
        })
        return(<div className="max-width paper">
            <button className="mdl-button margin mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.goNewOrder}>new order</button>
            <Checkbox
                className="margin"
                style={{display: 'inline'}}
                defaultChecked={this.state.showAllOrders}
                onChange={this.switchShowAll}
                label="Show all orders"
            />
            {ordersList}
        </div>)
    }
})
