import React from 'react';
OrderManagerMenu = React.createClass({

    render() {
        var order = this.props.order || {};
        return(<div className="max-width margin-top">
            {order.isSubmitted() ?
                <OrderMenuForm order={order}/>
            :
                <div className="paper padding">
                    <h4>You must submit the order to construct menu</h4>
                </div>
            }
            <MenuitemsContainer orderId={order._id} layout="table" />
            <ChefConfirmations order={order}/>
        </div>)
    }
});
