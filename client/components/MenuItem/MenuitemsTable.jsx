MenuitemsTable = React.createClass({

    getInitialState() {
        return {
            addMenuitemsMode: this.props.mode === 'addMenuitemToOrder',
            checkedItemIds: []
        }
    },

    onMenuitemClick(mouseEvent, reactId, event) {
        mouseEvent.stopPropagation() // Doesn't seem to help
        if (this.stoppage) return // Stop propagation properly
        this.stoppage = true

        // Timeout is needed, because stopPropagation does not work and this.stoppage needs a delay
        Meteor.setTimeout(function(){
            this.stoppage = false
            var menuitemId = $(mouseEvent.target).parents('[data-menuitem-id]').attr("data-menuitem-id")
            if (!menuitemId) return false

            if (this.state.addMenuitemsMode) {
                var checkedItemIds = this.state.checkedItemIds
                if (_.contains(checkedItemIds, menuitemId)) {
                    checkedItemIds = _.without(checkedItemIds, menuitemId)
                } else {
                    checkedItemIds.push(menuitemId)
                }
                this.setState({checkedItemIds: checkedItemIds})
                this.props.checkboxesChanged(checkedItemIds)
            } else {
                FlowRouter.go('menuitem', {menuitemId: menuitemId})
            }
        }.bind(this), 10);
    },

    render() {
        var menuitems = this.props.menuitems
        var addMenuitemsMode = this.state.addMenuitemsMode
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {menuitems.map(function(menuitem, i) {
                        return <MenuitemInTable
                                    key={i}
                                    menuitem={menuitem}
                                    checkboxes={addMenuitemsMode}
                                    checked={_.contains(this.state.checkedItemIds, menuitem._id)}
                                    defaultChecbox={true}
                                    onClick={this.onMenuitemClick}/>
                    }.bind(this))}
                </tbody>
            </table>
            <div className="paper margin padding">
                {/* temp info module for copy-pasting. */}
                {menuitems.map(function(menuitem, i) {
                    return <span>{menuitem.title} ({menuitem.weight}g) {menuitem.amount}tk<br/></span>
                }.bind(this))}
            </div>
        </div>)
    }
})
