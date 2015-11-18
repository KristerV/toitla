NewOrderSectionContacts = React.createClass({
    primaryClick(e) {
        var currentIndex = this.props.flowIndex
        var nextFlowSection = this.props.primaryFlowNext
        this.props.order.nextFlowSection(currentIndex, nextFlowSection)
    },
    secondaryClick(e) {
        var currentIndex = this.props.flowIndex
        var nextFlowSection = this.props.secondaryFlowNext
        this.props.order.nextFlowSection(currentIndex, nextFlowSection)
    },
    render() {
        var order = this.props.order
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "contact_form", true)}/>}
            rightContent={<OrderContactForm order={order}/>}
            buttons={<NewOrderFlowButtons
                    primaryLabel={T("order", "contact_form_primary_button")}
                    secondaryLabel={T("order", "contact_form_secondary_button")}
                    primaryClick={this.primaryClick}
                    secondaryClick={this.secondaryClick}
                />}
        />)
    }
})
