OrderContactForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },
    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        return(<div className="paper margin padding">
            <TextInput
                label="Organisatsioon"
                name="contact.organization"
                onBlur={this.handleTextFieldChange}
                value={order.contact.organization}
                errorMsg={order.errors['contact.organization']} />
            <TextInput
                label="Kontakti nimi"
                name="contact.name"
                onBlur={this.handleTextFieldChange}
                value={order.contact.name}
                errorMsg={order.errors['contact.name']} />
            <TextInput
                label="Telefoni number"
                name="contact.number"
                onBlur={this.handleTextFieldChange}
                value={order.contact.number}
                pattern="-?[0-9]*(\.[0-9]+)?"
                patternError="Palun sisesta number"
                errorMsg={order.errors['contact.number']} />
            <TextInput
                label="E-mail"
                name="contact.email"
                onBlur={this.handleTextFieldChange}
                value={order.contact.email}
                pattern="^[^@]+@[^@]+\.[^@]+$"
                patternError="Oled kindel, et see on su email?"
                errorMsg={order.errors['contact.email']} />
            <Loader ifNot={order.contact}/>
        </div>)
    }
})
