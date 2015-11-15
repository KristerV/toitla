NewOrder = React.createClass({

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        return(<div className="h100">
            <StatusForm order={order}/>

            {/*Contacts*/}
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "contact_form", true)}/>}
                rightContent={<OrderContactForm order={order}/>}
            />
            <OrderFinishForm order={order}
                textKey={"contact_form_finish"}
                labelKey={"extra_form_label"}
                />

            {/*Event details*/}
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "event_form", true)}/>}
                rightContent={<OrderEventForm order={order}/>}
            />
            <OrderFinishForm order={order}
                textKey={"event_form_finish"}
                labelKey={"extra_form_label"}
                />

            {/*Menu*/}
            {/*<MenuItemsContainer order={order}/>*/}

            {/*Allergies*/}
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "allergies_form", true)}/>}
                rightContent={<OrderAllergiesForm order={order}/>}
            />
            <OrderFinishForm order={order}
                textKey={"allergies_form_finish"}
                labelKey={"extra_form_label"}
                />

            {/*Price*/}
            <OrderSection
                content={<OrderSectionText dangerouslySetInnerHTML={T("order", "price_form", true)}/>}
            />
            <OrderFinishForm order={order}
                textKey={"price_form_finish"}
                labelKey={"price_form_finish_label"}
                />

            {/*Last chance*/}
            <OrderFinishForm order={order}
                textKey={"extra_form"}
                labelKey={"extra_form_label"}
                />

            {/*Thanks*/}
            <OrderSection
                content={<OrderSectionText dangerouslySetInnerHTML={T("order", "form_finish", true)}/>}
            />
        </div>)
    }
})
