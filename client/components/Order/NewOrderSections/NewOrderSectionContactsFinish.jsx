NewOrderSectionContactsFinish = React.createClass({
    render() {
        var order = this.props.order
        return(<OrderFinishForm order={order}
            textKey={"contact_form_finish"}
            labelKey={"extra_form_label"}
            buttons={<OrderFlowButtons
                    flowIndex={this.props.flowIndex}
                    primaryLabel={T("order", "finish_form_button_label")}
                    primaryFlowNext={this.props.primaryFlowNext}
                />}
            />)
    }
})
