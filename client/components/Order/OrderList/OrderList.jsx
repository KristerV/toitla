OrderList = React.createClass({

    goNewOrder(e) {
        Order.createOrder()
    },

    render() {
        var orders = this.props.orders

        return(<div className="max-width paper margin-top">
            <button className="mdl-button margin mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.goNewOrder}>new order</button>
            <Checkbox
                className="margin"
                style={{display: 'inline'}}
                defaultChecked={this.props.showAllOrders}
                onChange={this.props.switchShowAll}
                label="Show all orders"
            />
            {orders.map(order => {
                return <div key={order._id}>
                    <OrderListItem order={order}/>
                </div>
            })}
        </div>)
    }

})
