OrderMenuForm = React.createClass({
    handleClassChange(e) {
        this.props.order.updateField('price.class', e.target.value)
        this.props.order.refreshMenu()
    },
    handleCheckboxChange(e) {
        this.props.order.handleChangeCheckbox(e)
        this.props.order.calculatePrice()
    },
    render() {
        var order = this.props.order
        order.price = order.price || {}
        return(<div className="paper margin padding">
            <h5 className="text-hint text-center">fancymeter</h5>
            <input
                className="mdl-slider mdl-js-slider"
                type="range"
                min="0"
                defaultValue={order.price.class || 1}
                max="2"
                step="1"
                onChange={this.handleClassChange}
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
            <h4 className="text-center">Get this menu for {order.price.calculated}€</h4>
            <Loader id="calculating-price-loader"/>
        </div>)
    }
})
