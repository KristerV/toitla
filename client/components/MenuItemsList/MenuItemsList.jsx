MenuItemsList = React.createClass({

    onAddItemsToOrder(e) {
        var orderId = this.props.orderId
        var newItems = []
        $('table .mdl-js-checkbox').each(function(){
            if ($(this).find("input[type=checkbox]").is(":checked"))
                newItems.push(this.id)
        })
        Meteor.call('menuitemInOrder--addArray', orderId, newItems)
        FlowRouter.go('order', {orderId: orderId})
    },

    render() {
        var menuitems = this.props.menuitems
        return(<div className="paper">
            {this.props.orderId ?
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent margin" onClick={this.onAddItemsToOrder}>Add selection to order</button>
            : null}
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp max-width">
                <thead>
                    <tr>
                        {!!this.props.orderId ? <th>C</th> : null}
                        <th>Chef</th>
                        <th>Title</th>
                        <th>Ing.</th>
                        <th>Tags</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {menuitems.map(function(menuitem, i) {
                        return <MenuItemsListItem key={i} menuitem={menuitem} checkboxes={!!this.props.orderId}/>
                    }.bind(this))}
                </tbody>
            </table>
        </div>)
    }
})
