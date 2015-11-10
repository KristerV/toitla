NewOrder = React.createClass({

    render() {
        var order = this.props.order
        if (order)
            var menuitems = <MenuItemsContainer orderId={order._id}/>
        return(<div>
            <StatusForm order={order}/>
            <OrderContactForm order={order}/>
            {/*<EventDetailsForm order={order}/>*/}
            {/*<AllergiesForm order={order}/>*/}
            {/*<PriceForm order={order}/>*/}
            {/*<OutroForm order={order} header="Testing question" description="smaller text" onPrimaryClick={this.onPrimaryClick} onSecondaryClick={this.onSecondaryClick} />*/}
            {menuitems}
        </div>)
    }
})
