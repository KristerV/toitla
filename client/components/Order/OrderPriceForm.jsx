OrderPriceForm = React.createClass({

    render() {
        if (!this.props.order || !this.props.order.price || !this.props.order.price.calculated)
            return(<br/>)
        var order = this.props.order

        return(<div className="paper margin padding">
            <p>Considering your event size and length we've calculated the price to be</p>
            <h2>{order.price.calculated}€</h2>
        </div>)
    }
})
