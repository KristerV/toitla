import React from 'react';
OrderPaymentForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e);
    },
    render() {
        if (!this.props.order) {
            return(<Loader/>);
        }

        var order = this.props.order;
        order.payment = order.payment || {};
        order.errors = order.errors || {};
        order.errors.payment = order.errors.payment || {};

        return(<div className="paper margin padding">
            <TextInput
                label={T.order.form.payment.name()}
                name="payment.name"
                onBlur={this.handleTextFieldChange}
                value={order.payment.name}
                errorMsg={order.errors.payment.name} />
            <Loader ifNot={order.payment}/>
        </div>)
    }
});
