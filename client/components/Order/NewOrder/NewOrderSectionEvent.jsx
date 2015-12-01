NewOrderSectionEvent = React.createClass({
    render() {
        var order = this.props.order
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "event_form", true)}/>}
            rightContent={<OrderEventForm order={order}/>}
            buttons={<NewOrderFlowButtons
                    order={order}
                    flowIndex={this.props.flowIndex}
                    primaryLabel={T("order", "event_form_primary_button_label")}
                    secondaryLabel={T("order", "event_form_secondary_button_label")}
                    primaryFlowNext={this.props.primaryFlowNext}
                    secondaryFlowNext={this.props.secondaryFlowNext}
                    primaryAction={this.props.primaryAction}
                    secondaryAction={this.props.secondaryAction}
                />}
        />)
    }
})
