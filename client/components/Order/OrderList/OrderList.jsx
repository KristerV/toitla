OrderList = React.createClass({

    goNewOrder(e) {
        Order.createOrder()
    },

    render() {
        var orders = this.props.orders
        var showTitle = Roles.userIsInRole(Meteor.userId(), 'chef') && !Roles.userIsInRole(Meteor.userId(), 'manager')

        return(<div className="max-width margin-top">
            {showTitle ? <h3 className="text-white text-center">Upcoming orders and ones you're <span className="text-yellow">participating</span> in.</h3> :null}
            <div className="paper">
                <button className="mdl-button margin mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.goNewOrder}>new order</button>
                <Checkbox
                    className="margin"
                    style={{display: 'inline'}}
                    defaultChecked={this.props.showOnlyCompleted}
                    onChange={this.props.switchShowAll}
                    label="Show only completed orders"
                />
                {orders.map(order => {
                    return <div key={order._id}>
                        <OrderListItem order={order}/>
                    </div>
                })}
            </div>
        </div>)
    }

})
