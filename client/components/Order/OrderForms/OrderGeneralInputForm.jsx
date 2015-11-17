OrderGeneralInputForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        var props = this.props
        order.errors = order.errors || {}

        return(<div className="paper margin padding">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <TextInput
                label={props.inputLabel}
                name={props.inputName}
                onBlur={this.handleTextFieldChange}
                value={props.inputValue}
                label={props.inputLabel}
                errorMsg={props.inputErrorMsg}
                rows={props.inputRows} />
        </div>)
    }
})
