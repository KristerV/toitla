OrderFinishSection = React.createClass({
    render() {
        var order = this.props.order || {}
        order.errors = order.errors || {}
        if (!this.props.labelKey)
            console.error("No label specified: OrderFinishSection")
        if (!this.props.textKey)
            console.error("No textKey specified: OrderFinishSection")
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", this.props.textKey, true)}/>}
            rightContent={<OrderGeneralInputForm
                order={order}
                inputRows={1}
                inputName="extraInfo"
                inputLabel={T("order", this.props.labelKey)}
                inputValue={order.extraInfo}
                inputErrorMsg={order.errors['extraInfo']}
                buttons={this.props.buttons}
                />}
        />)
    }
})
