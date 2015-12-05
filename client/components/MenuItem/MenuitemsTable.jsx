MenuitemsTable = React.createClass({

    render() {

        var addMenuitemsMode = this.props.mode === 'addMenuitemToOrder'

        return(<div className="paper">
            {addMenuitemsMode ?
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent margin" onClick={this.props.modeAction}>Add selection to order</button>
            : null}
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp max-width">
                <thead>
                    <tr>
                        {addMenuitemsMode ? <th>C</th> : null}
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
                    {this.props.menuitems.map(function(menuitem, i) {
                        return <MenuitemInTable key={i} menuitem={menuitem} checkboxes={addMenuitemsMode}/>
                    }.bind(this))}
                </tbody>
            </table>
        </div>)
    }
})
