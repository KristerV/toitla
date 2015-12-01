NewOrderSectionExtra = React.createClass({
    render() {
        var order = this.props.order || {}
        order.errors = order.errors || {}
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", "extra_form", true)}/>}
            rightContent={<OrderGeneralInputForm
                order={order}
                inputRows={1}
                inputName="extraInfo"
                inputLabel={T("order", "extra_form_label")}
                inputValue={order.extraInfo}
                inputErrorMsg={order.errors['extraInfo']}
                buttons={<NewOrderFlowButtons
                        order={order}
                        flowIndex={this.props.flowIndex}
                        primaryLabel={T("order", "finish_form_button_label")}
                        primaryFlowNext={this.props.primaryFlowNext}
                        primaryAction={this.props.primaryAction}
                    />}
                />}
        />)
    }
})
