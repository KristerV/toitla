NewOrder = React.createClass({

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        return(<div className="h100">
            <StatusForm order={order}/>
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "contact_form", true)}/>}
                rightContent={<OrderContactForm order={order}/>}
            />
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "event_form", true)}/>}
                rightContent={<OrderEventForm order={order}/>}
            />
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "allergies_form", true)}/>}
                rightContent={<OrderAllergiesForm order={order}/>}
            />
            <OrderSection
                content={<OrderSectionText dangerouslySetInnerHTML={T("order", "price_form", true)}/>}
            />
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "anything_else", true)}/>}
                rightContent={<OrderGeneralInputForm
                    order={order}
                    inputName="extraInfo"
                    inputLabel={T("anything_else_placeholder")}
                    inputValue={order.extraInfo}
                    inputErrorMsg={order.errors['extraInfo']}
                    />}
            />
            {/*<MenuItemsContainer order={order}/>*/}
        </div>)
    }
})
