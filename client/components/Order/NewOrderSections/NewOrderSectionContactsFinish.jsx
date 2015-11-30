NewOrderSectionContactsFinish = React.createClass({
    render() {
        var order = this.props.order
        return(<OrderFinishSection order={order}
            textKey={"contact_form_finish"}
            labelKey={"extra_form_label"}
            buttons={<NewOrderFlowButtons
                    order={order}
                    flowIndex={this.props.flowIndex}
                    primaryLabel={T("order", "finish_form_button_label")}
                    primaryFlowNext={this.props.primaryFlowNext}
                    primaryAction={this.props.primaryAction}
                    secondaryAction={this.props.secondaryAction}
                />}
            />)
    }
})
