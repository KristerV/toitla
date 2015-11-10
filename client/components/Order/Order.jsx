NewOrder = React.createClass({

    render() {
        var order = this.props.order
        if (order)
            var menuitems = <MenuItemsContainer orderId={order._id}/>
        return(<div>
            <StatusForm order={order}/>
            <OrderContactForm order={order}/>
            <OrderEventForm order={order}/>
            <OrderAllergiesForm order={order}/>
            {/*<OrderPriceForm order={order}/>*/}
            {/*<OrderOutroForm order={order} header="Testing question" description="smaller text" onPrimaryClick={this.onPrimaryClick} onSecondaryClick={this.onSecondaryClick} />*/}
            {menuitems}
        </div>)
    }
})
