NewOrderSectionContacts = React.createClass({
    render() {
        var order = this.props.order
        return(<OrderSection
            leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "contact_form", true)}/>}
            rightContent={<OrderContactForm order={order}/>}
            buttons={<OrderFlowButtons
                    primaryLabel={T("order", "contact_form_primary_button")}
                    secondaryLabel={T("order", "contact_form_secondary_button")}
                    flowIndex={this.props.flowIndex}
                    primaryFlowNext={this.props.primaryFlowNext}
                    secondaryFlowNext={this.props.secondaryFlowNext}
                />}
        />)
    }
})
