OrderManagerStatus = React.createClass({

    orderDone() {
        Meteor.call('Order--resultChange', this.props.order._id, 'done')
    },
    orderLost() {
        Meteor.call('Order--resultChange', this.props.order._id, 'lost')
    },

    render() {
        var order = this.props.order
        order.result = order.result || {}

        var isDone = order.result.result === 'done'
        var isLost = order.result.result === 'lost'

        var doneClass = isDone ? " mdl-button--accent" : ""
        var lostClass = isLost ? " mdl-button--colored" : ""

        return(<div className="max-width margin-top mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
                <h3 className="text-white text-center">Status</h3>
                <Checklist
                    disabled={true}
                    collectionName="orders"
                    docId={order._id}
                    datapath="status"
                />
            </div>
            <div className="mdl-cell mdl-cell--4-col">
                <h3 className="text-white text-center">Result</h3>
                <div className="paper padding mdl-grid">
                    <button className={"mdl-button mdl-js-button mdl-button--raised mdl-cell mdl-cell--6-col" + doneClass} onClick={this.orderDone}>
                        Done
                    </button>
                    <button className={"mdl-button mdl-js-button mdl-button--raised mdl-cell mdl-cell--6-col" + lostClass} onClick={this.orderLost}>
                        Lost
                    </button>
                    {isDone ?
                        <TextInput
                            label="How many pieces of food was left over?"
                            name="result.foodLeft"
                            value={order.result.foodLeft}
                            patternTemplate="float"
                            onBlur={order.handleTextFieldChange.bind(order)}
                        />
                    : null}
                    {isLost ?
                        <Checklist
                            datapath="lostReasons"
                            collectionName="orders"
                            docId={order._id}
                        />
                    : null}
                </div>
            </div>
        </div>)
    }
})
