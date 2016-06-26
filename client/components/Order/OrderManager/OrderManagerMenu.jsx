import React from 'react';
OrderManagerMenu = React.createClass({

    render() {
        var order = this.props.order || {}
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
            <div className="mdl-cell--5-col margin-bottom">
                <h3 className="text-white text-center">Menu Building Checklist</h3>
                <div className="paper padding">
                    <Checklist collectionName="orders" docId={order._id} datapath="menuComposition"/>
                </div>
            </div>
        </div>)
    }
})
