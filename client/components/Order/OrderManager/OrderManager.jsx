OrderManager = React.createClass({

    render() {
        var order = this.props.order || {}
        order.errors = order.errors || {}
        return(<div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
                <StatusForm order={order}/>
                <OrderContactForm order={order}/>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
                <OrderEventForm order={order}/>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
                <OrderAllergiesForm order={order}/>
            </div>
            <div className="mdl-cell mdl-cell--8-col">
                <OrderGeneralInputForm
                    order={order}
                    inputRows={1}
                    inputName="extraInfo"
                    inputLabel={T("order", "extra_form_label")}
                    inputValue={order.extraInfo}
                    inputErrorMsg={order.errors['extraInfo']}
                />
            </div>
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
