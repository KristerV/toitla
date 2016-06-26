import React from 'react';
OrderResult = React.createClass({

    handleClickResult(e) {
        const btn = e.target.name
        const current = this.props.order.result.result
        let newStatus = ""
        if (btn === current)
            newStatus = null
        else
            newStatus = btn
        Meteor.call('Order--resultChange', this.props.order._id, newStatus)
    },

    render() {
        var order = this.props.order
        order.result = order.result || {}

        var isDone = order.result.result === 'done'
        var isLost = order.result.result === 'lost'

        var doneClass = isDone ? " mdl-button--accent" : ""
        var lostClass = isLost ? " mdl-button--colored" : ""
        return (<div className="paper padding mdl-grid">
            <button name="done"
                className={"mdl-button mdl-js-button mdl-button--raised mdl-cell mdl-cell--6-col" + doneClass}
                onClick={this.handleClickResult}>
                Done
            </button>
            <button name="lost"
                className={"mdl-button mdl-js-button mdl-button--raised mdl-cell mdl-cell--6-col" + lostClass}
                onClick={this.handleClickResult}>
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
        </div>)
    }

})