OrderFinishForm = React.createClass({
    render() {
        var order = this.props.order
        return(<NewOrderSection
            leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T("order", this.props.textKey, true)}/>}
            rightContent={<OrderGeneralInputForm
                order={order}
                inputName="extraInfo"
                inputLabel={T("order", this.props.labelKey)}
                inputValue={order.extraInfo}
                inputErrorMsg={order.errors['extraInfo']}
                />}
        />)
    }
})