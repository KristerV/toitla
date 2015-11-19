NewOrderSectionContacts = React.createClass({
    render() {
        var order = this.props.order
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "contact_form", true)}/>}
            rightContent={<OrderContactForm order={order}/>}
            buttons={<NewOrderFlowButtons
                    order={order}
                    primaryLabel={T("order", "contact_form_primary_button")}
                    secondaryLabel={T("order", "contact_form_secondary_button")}
                    flowIndex={this.props.flowIndex}
                    primaryFlowNext={this.props.primaryFlowNext}
                    secondaryFlowNext={this.props.secondaryFlowNext}
                    primaryAction={this.props.primaryAction}
                    secondaryAction={this.props.secondaryAction}
                />}
        />)
    }
})
