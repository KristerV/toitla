NewOrderSectionEvent = React.createClass({
    render() {
        var order = this.props.order
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "event_form", true)}/>}
            rightContent={<OrderEventForm order={order}/>}
            buttons={<NewOrderFlowButtons
                    flowIndex={this.props.flowIndex}
                    primaryLabel={T("order", "event_form_primary_button_label")}
                    primaryFlowNext={this.props.primaryFlowNext}
                    secondaryLabel={T("order", "event_form_secondary_button_label")}
                    secondaryFlowNext={this.props.secondaryFlowNext}
                />}
        />)
    }
})
