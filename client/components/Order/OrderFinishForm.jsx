OrderFinishForm = React.createClass({
    render() {
        var order = this.props.order
        return(<OrderSection
            leftContent={<OrderSectionText dangerouslySetInnerHTML={T("order", this.props.textKey, true)}/>}
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
