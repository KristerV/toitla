NewOrder = React.createClass({

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        return(<div>
            <StatusForm order={order}/>
            <OrderContactForm order={order}/>
            <OrderEventForm order={order}/>
            {/*<MenuItemsContainer order={order}/>*/}
            <OrderAllergiesForm order={order}/>
            <OrderPriceForm order={order}/>
            <OrderGeneralInputForm
                order={order}
                title={T("order", "anything_else")}
                inputName="extraInfo"
                inputValue={order.extraInfo}
                inputErrorMsg={order.errors['extraInfo']}
                />
            {/*<OrderGeneralInfoForm order={order} title="Testing question" description="smaller text"/>*/}
        </div>)
    }
})
