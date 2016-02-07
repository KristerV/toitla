OrderManagerMenu = React.createClass({

    render() {
        var order = this.props.order || {}
        return(<div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
                {order.isSubmitted() ?
                    <OrderMenuForm order={order}/>
                :
                    <div className="paper padding">
                        <h4>You must submit the order to construct menu</h4>
                    </div>
                }
            </div>
            <div className="mdl-cell mdl-cell--12-col">
                <MenuitemsContainer orderId={order._id} layout="table" />
            </div>
        </div>)
    }
})
