import React from 'react';
ChefConfirmations = React.createClass({

    getInitialState() {
        return {
            emailButtonActive: true,
        }
    },

    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e)
    },

    handleFromTimeChange(nill, time) {
        this.props.order.updateField('extra.readyBy', time)
    },

    sendConfirmEmails() {
        this.setState({emailButtonActive: false});
        Meteor.call('Order--sendConfirmationEmails', this.props.order._id)
    },

    render() {
        let order = this.props.order;
        order.chefs = order.chefs || [];
        order.extra = order.extra || {};

        if (!order.isStatusChecked(Settings.checklistReserved.openChefConfirmations)) {
            return <p className="padding margin text-white text-hint">Chef confirming can start by ticking "{Settings.checklistReserved.openChefConfirmations}" in the status tab.</p>
        }

        const allergies = order.getAllergies();

        return(<div>
                    { this.renderConfirmationEmailsBlock() }
                    <div className="paper padding">
                        <TextInput label="Add notes for all chefs"
                                   name="extra.notes"
                                   onBlur={this.handleTextFieldChange}
                                   value={order.extra.notes} />
                        <TimePickerMUI label="Choose time by which all chefs must be ready"
                                       name="extra.readyBy"
                                       onChange={this.handleFromTimeChange}
                                       value={order.extra.readyBy} />
                    </div>
                    {_.map(order.chefs, item => {
                        return <div className="mdl-cell mdl-cell--4-cell" key={item._id}>
                            <ChefConfirm chef={item} order={order} allergies={allergies}/>
                        </div>
                    })}
                </div>)
    },

    renderConfirmationEmailsBlock() {
        if (this.state.emailButtonActive) {
            return (
                <div className="paper padding margin-bottom">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored w100 margin-top"
                            onClick={this.sendConfirmEmails}>
                        Send confirmation emails
                    </button>
                </div>
            );
        } else {
            return (
                <div className="paper padding margin-bottom">
                    <button className="mdl-button mdl-js-button mdl-button--raised w100 margin-top">Confirmation emails sent</button>
                </div>
            );
        }
    }

});
