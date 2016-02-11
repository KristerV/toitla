ChefConfirmations = React.createClass({

    getInitialState() {
        return {
            emailButtonActive: true,
        }
    },

    sendConfirmEmails(e) {
        this.setState({emailButtonActive: false})
        Meteor.call('Order--sendConfirmationEmails', this.props.order._id)
    },

    render() {
        var order = this.props.order
        order.chefs = order.chefs || []

        if (!order.isPhaseAchieved('chefConfirm')) {
            return <p className="padding margin text-white text-hint">Chef confirming can start with "Chefs confirm" status.</p>
        }

        return(<div className="mdl-grid">
                {this.state.emailButtonActive ?
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored w100 margin-top" onClick={this.sendConfirmEmails}>Send confirmation emails</button>
                    :
                    <button className="mdl-button mdl-js-button mdl-button--raised w100 margin-top">Email sent</button>
                }
                {_.map(order.chefs, item => {
                    return <div className="mdl-cell mdl-cell--4-cell" key={item._id}>
                        <ChefConfirm chef={item} orderId={order._id}/>
                    </div>
                })}
            </div>)
    }

})
