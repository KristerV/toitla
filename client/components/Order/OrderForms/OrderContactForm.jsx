OrderContactForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },
    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        order.errors.contact = order.errors.contact || {}
        return(<div className="paper margin padding">
            <TextInput
                label={T.order.organization()}
                name="contact.organization"
                onBlur={this.handleTextFieldChange}
                value={order.contact.organization}
                errorMsg={order.errors.contact.organization} />
            <TextInput
                label={T.order.name()}
                name="contact.name"
                onBlur={this.handleTextFieldChange}
                value={order.contact.name}
                errorMsg={order.errors.contact.name} />
            <TextInput
                label={T.order.telephone()}
                name="contact.number"
                onBlur={this.handleTextFieldChange}
                value={order.contact.number}
                pattern="^\+?[0-9 ]*"
                patternError={T.order.telephone_patternError()}
                errorMsg={order.errors.contact.number} />
            <TextInput
                label={T.order.email()}
                name="contact.email"
                onBlur={this.handleTextFieldChange}
                value={order.contact.email}
                pattern="^[^@]+@[^@]+\.[^@]+$"
                patternError={T.order.email_patternError()}
                errorMsg={order.errors.contact.email} />
            <Loader ifNot={order.contact}/>
        </div>)
    }
})
