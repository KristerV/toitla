OrderMenuForm = React.createClass({
    handleSliderChange(e) {
        this.props.order.updateField(e.target.name, e.target.value)
        this.props.order.refreshMenu()
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
        return(<div className="paper margin padding">
            <h5 className="text-hint text-center">{T("order", "price_slider_title")}</h5>
            <input
                className="mdl-slider mdl-js-slider"
                type="range"
                min="0"
                defaultValue={order.price.class || 1}
                max="2"
                step="1"
                name="price.class"
                onChange={this.handleSliderChange}
                />
            <h5 className="text-hint text-center">
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
            <br/>
            <Checkbox
                checked={order.price.serveCoffee}
                label={T("order","serve_coffee")}
                name={'price.serveCoffee'}
                onChange={this.handleCheckboxChange}/>
            <Checkbox
                checked={order.price.serveDrinks}
                label={T("order","serve_drinks")}
                name={'price.serveDrinks'}
                onChange={this.handleCheckboxChange}/>
            <br/>
            <h3 className="text-center">Price: {order.price.calculated}€</h3>
            <h5 className="text-center">Pieces: {order.price.totalPieces}pcs</h5>
            <h5 className="text-center">Weigth: {order.price.totalWeight}g</h5>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent w100" onClick={this.emptyOrderFromMenuitems}>remove all foods</button>
            <Loader id="calculating-price-loader"/>
        </div>)
    }
})
