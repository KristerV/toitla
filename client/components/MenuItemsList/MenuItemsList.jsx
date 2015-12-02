MenuItemsList = React.createClass({
    render() {
        var menuitems = this.props.menuitems
        return(<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp max-width">
            <thead>
                <tr>
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
                    return <MenuItemsListItem key={i} menuitem={menuitem}/>
                })}
            </tbody>
        </table>)
    }
})
