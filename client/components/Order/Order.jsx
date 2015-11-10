NewOrder = React.createClass({

    render() {
        var order = this.props.order
        if (order)
            var menuitems = <MenuItemsContainer orderId={order._id}/>
        return(<div>
            <StatusForm order={order}/>
            <DetailsForm order={order}/>
            {menuitems}
        </div>)
    }
})
