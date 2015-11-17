NewOrderSectionThanks = React.createClass({
    render() {
        var order = this.props.order
        return(<NewOrderSection
            bottomContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "thanks_form", true)}/>}
            bottomButtons={<NewOrderFlowButtons
                    flowIndex={this.props.flowIndex}
                    primaryLabel={T("order", "")}
                    primaryFlowNext={this.props.primaryFlowNext}
                />}
        />)
    }
})
