NewOrderSectionMenu = React.createClass({
    render() {
        var order = this.props.order
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "menu_form", true)}/>}
            rightContent={<OrderMenuForm order={order}/>}
            bottomContent={<MenuItemsContainer order={order}/>}
            buttons={<NewOrderFlowButtons
                    flowIndex={this.props.flowIndex}
                    primaryLabel={T("order", "menu_form_primary_button_label")}
                    primaryFlowNext={this.props.primaryFlowNext}
                    secondaryLabel={T("order", "menu_form_secondary_button_label")}
                    secondaryFlowNext={this.props.secondaryFlowNext}
                />}
        />)
    }
})
