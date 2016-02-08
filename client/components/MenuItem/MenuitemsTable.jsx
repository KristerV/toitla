MenuitemsTable = React.createClass({

    goToOrder() {
        FlowRouter.go('orderTab', {orderId: FlowRouter.getParam("orderId"), tab: 'menu'})
    },

    render() {
        var menuitems = this.props.menuitems
        var addMenuitemsMode = FlowRouter.current().route.name === 'menus-addItem'
        var isAmount = menuitems.length > 0 ? menuitems[0].amount : false

        return(<div>
            {addMenuitemsMode ?
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent margin" onClick={this.goToOrder}>Return to order</button>
            : null}
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp paper max-width">
                <thead>
                    <tr>
                        <th>In Order</th>
                        <th className="mdl-data-table__cell--non-numeric">Chef</th>
                        <th className="mdl-data-table__cell--non-numeric">Title</th>
                        <th className="mdl-data-table__cell--non-numeric">Ing.</th>
                        <th className="mdl-data-table__cell--non-numeric">Tags</th>
                        {isAmount ? <th>Amount</th> : null}
                        <th className="mdl-data-table__cell--non-numeric">Type</th>
                        <th>Price</th>
                        <th>Weight</th>
                        {FlowRouter.current().route.name === 'order' ? <th>Confirm</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {menuitems.map(function(menuitem, i) {
                        return <MenuitemInTable key={menuitem._id} menuitem={menuitem}/>
                    }.bind(this))}
                </tbody>
            </table>
            {FlowRouter.current().route.name === 'order' ?
                <div className="paper margin padding">
                    {/* temp info module for copy-pasting. */}
                    {menuitems.map(function(menuitem, i) {
                        return <span key={i}>{menuitem.title} ({menuitem.weight}g) {menuitem.amount}tk<br/></span>
                    }.bind(this))}
                </div>
            : null}
        </div>)
    }
})
