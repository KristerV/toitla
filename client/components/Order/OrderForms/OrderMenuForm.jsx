OrderMenuForm = React.createClass({
    getInitialState() {
        return {
            emailButtonActive: true,
        }
    },
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
    sendConfirmEmails(e) {
        this.setState({emailButtonActive: false})
        Meteor.call('Order--sendConfirmationEmails', this.props.order._id)
    },
    render() {
        var order = this.props.order
        order.price = order.price || {}
        return(<div className="paper margin padding">
            {/*<h5 className="text-hint text-center">{T("order", "price_slider_title")}</h5>
            <input
                className="mdl-slider mdl-js-slider"
                type="range"
                min="0"
                defaultValue={order.price.class || 1}
                max="2"
                step="1"
                name="price.class"
                onChange={this.handleSliderChange}
                />*/}
            {/*<h5 className="text-hint text-center">
                {T("order", "coffeeBreaks_slider_title")}: {order.price.coffeeBreaks || 1}
            </h5>
            <input
                className="mdl-slider mdl-js-slider"
                type="range"
                min="1"
                defaultValue={order.price.coffeeBreaks || 1}
                max="6"
                step="1"
                name="price.coffeeBreaks"
                onChange={this.handleSliderChange}
                />
            <br/>*/}
            <h4 style={{marginBottom: 0}}>Net Price: {order.price.calculated}€</h4>
            <p style={{marginBottom: 0}}>Net Price PP: {order.price.netPricePerPerson}€</p>
            <p style={{marginBottom: 0}}>Weight PP: {order.price.weightPerPerson}g</p>
            <p style={{marginBottom: 0}}>Pieces: {order.price.totalPieces}pcs</p>
            <p style={{marginBottom: 0}}>Pieces PP: {order.price.piecesPerPerson}pcs</p>
            <p className="text-hint">PP means Per Person</p>
            <MenuitemButtonAdd orderId={order._id}/>
            {this.state.emailButtonActive ?
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored w100 margin-top" onClick={this.sendConfirmEmails}>Send confirmation emails</button>
                :
                <button className="mdl-button mdl-js-button mdl-button--raised w100 margin-top">Email sent</button>
            }
            <button className="mdl-button mdl-js-button w100 margin-top" onClick={this.emptyOrderFromMenuitems}>remove all foods</button>
            <Loader id="calculating-price-loader"/>
        </div>)
    }
})
