MenuitemsTable = React.createClass({

    render() {
        var menuitems = this.props.menuitems
        var addMenuitemsMode = this.props.mode === 'addMenuitemToOrder'
        var isAmount = menuitems.length > 0 ? menuitems[0].amount : false

        return(<div>
            {addMenuitemsMode ?
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent margin" onClick={this.props.modeAction}>Add selection to order</button>
            : null}
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp paper max-width">
                <thead>
                    <tr>
                        {addMenuitemsMode ? <th>C</th> : null}
                        <th className="mdl-data-table__cell--non-numeric">Chef</th>
                        <th className="mdl-data-table__cell--non-numeric">Title</th>
                        <th className="mdl-data-table__cell--non-numeric">Ing.</th>
                        <th className="mdl-data-table__cell--non-numeric">Tags</th>
                        {isAmount ? <th>Amount</th> : null}
                        <th className="mdl-data-table__cell--non-numeric">Type</th>
                        <th>Price</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {menuitems.map(function(menuitem, i) {
                        return <MenuitemInTable key={i} menuitem={menuitem} checkboxes={addMenuitemsMode}/>
                    }.bind(this))}
                </tbody>
            </table>
        </div>)
    }
})
