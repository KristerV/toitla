OrderManagerStatus = React.createClass({

    submitOrder() {
        Meteor.call('NewOrder.submitForm', this.props.order._id)
    },

    render() {
        var order = this.props.order

        return(<div className="max-width margin-top mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
                <h3 className="text-white text-center">Status</h3>
                <div className="paper padding">
                    {order.status ?
                        <Checklist
                            disabled={true}
                            collectionName="orders"
                            docId={order._id}
                            datapath="status"
                        />
                    :
                        <button className="w100 mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.submitOrder}>
                            Submit order
                        </button>
                    }
                </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
                <h3 className="text-white text-center">Result</h3>
                <OrderResult order={order}/>
            </div>
        </div>)
    }
})
