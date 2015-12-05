NewOrderSectionMenu = React.createClass({
    render() {
        var order = this.props.order
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "menu_form", true)}/>}
            rightContent={<OrderMenuForm order={order}/>}
            bottomContent={<div>
                <MenuitemsContainer order={order}/>
                <NewOrderSectionText className="display-none" dangerouslySetInnerHTML={T("order", "no_menu_items", true)}/>
            </div>}
            buttons={<NewOrderFlowButtons
                    primaryLabel={T("order", "menu_form_primary_button_label")}
                    secondaryLabel={T("order", "menu_form_secondary_button_label")}
                    order={order}
                    flowIndex={this.props.flowIndex}
                    primaryFlowNext={this.props.primaryFlowNext}
                    secondaryFlowNext={this.props.secondaryFlowNext}
                    primaryAction={this.props.primaryAction}
                    secondaryAction={this.props.secondaryAction}
                />}
        />)
    }
})
