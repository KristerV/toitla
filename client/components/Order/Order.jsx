NewOrder = React.createClass({

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        return(<div className="h100">

            {/*Status*/}
            <StatusForm order={order}/>

            {/*Contacts*/}
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "contact_form", true)}/>}
                rightContent={<OrderContactForm order={order}/>}
                buttons={<OrderFlowButtons
                        flowIndex={0}
                        primaryLabel={T("order", "contact_form_primary_button")}
                        primaryFlowNext="event_form"
                        secondaryLabel={T("order", "contact_form_secondary_button")}
                        secondaryFlowNext="contact_form_finish"
                    />}
            />
            <OrderFinishForm order={order}
                textKey={"contact_form_finish"}
                labelKey={"extra_form_label"}
                buttons={<OrderFlowButtons
                        flowIndex={1}
                        primaryLabel={T("order", "finish_form_button_label")}
                        primaryFlowNext="thanks_form"
                    />}
                />

            {/*Event details*/}
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "event_form", true)}/>}
                rightContent={<OrderEventForm order={order}/>}
                buttons={<OrderFlowButtons
                        flowIndex={1}
                        primaryLabel={T("order", "event_form_primary_button_label")}
                        primaryFlowNext="allergies_form"
                        secondaryLabel={T("order", "event_form_secondary_button_label")}
                        secondaryFlowNext="event_form_finish"
                    />}
            />
            <OrderFinishForm order={order}
                textKey={"event_form_finish"}
                labelKey={"extra_form_label"}
                buttons={<OrderFlowButtons
                        flowIndex={2}
                        primaryLabel={T("order", "finish_form_button_label")}
                        primaryFlowNext="thanks_form"
                    />}
                />

            {/*Menu*/}
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "menu_form", true)}/>}
                rightContent={<OrderMenuForm order={order}/>}
                bottomContent={<MenuItemsContainer order={order}/>}
                buttons={<OrderFlowButtons
                        flowIndex={1}
                        primaryLabel={T("order", "menu_form_primary_button_label")}
                        primaryFlowNext="allergies_form"
                        secondaryLabel={T("order", "menu_form_secondary_button_label")}
                        secondaryFlowNext="menu_form_finish"
                    />}
            />
            <OrderFinishForm order={order}
                textKey={"menu_form_finish"}
                labelKey={"extra_form_label"}
                buttons={<OrderFlowButtons
                        flowIndex={2}
                        primaryLabel={T("order", "finish_form_button_label")}
                        primaryFlowNext="thanks_form"
                    />}
                />

            {/*Allergies*/}
            <OrderSection
                leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "allergies_form", true)}/>}
                rightContent={<OrderAllergiesForm order={order}/>}
                buttons={<OrderFlowButtons
                        flowIndex={2}
                        primaryLabel={T("order", "allergies_form_primary_button_label")}
                        primaryFlowNext="extra_form"
                    />}
            />

            {/*Extra info*/}
            <OrderFinishForm order={order}
                textKey={"extra_form"}
                labelKey={"extra_form_label"}
                buttons={<OrderFlowButtons
                        flowIndex={4}
                        primaryLabel={T("order", "finish_form_button_label")}
                        primaryFlowNext="thanks_form"
                    />}
                />

            {/*Thanks*/}
            <OrderSection
                bottomContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "thanks_form", true)}/>}
                bottomButtons={<OrderFlowButtons
                        flowIndex={5}
                        primaryLabel={T("order", "")}
                        primaryFlowNext=""
                    />}
            />
        </div>)
    }
})
