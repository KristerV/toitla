NewOrderSectionThanks = React.createClass({
    render() {
        var order = this.props.order
        return(<OrderSection
            bottomContent={<OrderSectionText dangerouslySetInnerHTML={T("order", "thanks_form", true)}/>}
            bottomButtons={<OrderFlowButtons
                    flowIndex={this.props.flowIndex}
                    primaryLabel={T("order", "")}
                    primaryFlowNext={this.props.primaryFlowNext}
                />}
        />)
    }
})
