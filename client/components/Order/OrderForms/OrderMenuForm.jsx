import React from 'react';
OrderMenuForm = React.createClass({
    handleSliderChange(e) {
        this.props.order.updateField(e.target.name, e.target.value)
    },
    handleCheckboxChange(e) {
        this.props.order.handleChangeCheckbox(e)
        this.props.order.calculateTotals()
    },
    emptyOrderFromMenuitems(e) {
        if (confirm("Remove all items for sure?"))
            this.props.order.removeAllMenuitems()
    },
    render() {
        var order = this.props.order
        order.price = order.price || {}
        let allergies = order.getAllergies()
        return(<div className="paper mdl-grid margin-top">
            <div className="mdl-cell--6-col padding">
                <h4 style={{marginBottom: 0}}>Net Price: {order.price.calculated}€</h4>
                <p style={{marginBottom: 0}}>Net Price PP: {order.price.netPricePerPerson}€</p>
                <p style={{marginBottom: 0}}>Weight PP: {order.price.weightPerPerson}g</p>
                <p style={{marginBottom: 0}}>Pieces: {order.price.totalPieces}pcs</p>
                <p style={{marginBottom: 0}}>Pieces PP: {order.price.piecesPerPerson}pcs</p>
                <p className="text-hint">PP means Per Person</p>
            </div>
            <div className="mdl-cell--6-col">
                <MenuitemButtonAdd orderId={order._id}/>
                <button className="mdl-button mdl-js-button w100 margin-top" onClick={this.emptyOrderFromMenuitems}>remove all foods</button>
                <Loader id="calculating-price-loader"/>
                {allergies ? <p className="text-red"><b>Allergies</b>: {allergies}</p> : null}
            </div>
        </div>)
    }
})
