import React from 'react';
OrderContactForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },
    render() {
        if (!this.props.order) {
            return(<Loader/>);
        }

        var order = this.props.order;
        order.errors = order.errors || {};
        order.errors.contact = order.errors.contact || {};

        return(<div className="paper margin padding">
            <TextInput
                label={T.order.form.contact.name()}
                name="contact.name"
                onBlur={this.handleTextFieldChange}
                value={order.contact.name}
                errorMsg={order.errors.contact.name} />
            <TextInput
                label={T.order.form.contact.telephone()}
                name="contact.number"
                onBlur={this.handleTextFieldChange}
                value={order.contact.number}
                pattern="^\+?[0-9 ]*"
                patternError={T.order.form.contact.telephone_patternError()}
                errorMsg={order.errors.contact.number} />
            <TextInput
                label={T.order.form.contact.email()}
                name="contact.email"
                onBlur={this.handleTextFieldChange}
                value={order.contact.email}
                pattern="^[^@]+@[^@]+\.[^@]+$"
                patternError={T.order.form.contact.email_patternError()}
                errorMsg={order.errors.contact.email} />
            <Loader ifNot={order.contact}/>
        </div>)
    }
});
