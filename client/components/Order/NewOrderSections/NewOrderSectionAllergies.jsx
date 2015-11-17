NewOrderSectionAllergies = React.createClass({
    render() {
        var order = this.props.order
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "allergies_form", true)}/>}
            rightContent={<OrderAllergiesForm order={order}/>}
            buttons={<NewOrderFlowButtons
                    flowIndex={this.props.flowIndex}
                    primaryLabel={T("order", "allergies_form_primary_button_label")}
                    primaryFlowNext={this.props.primaryFlowNext}
                />}
        />)
    }
})
