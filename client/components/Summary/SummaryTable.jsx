SummaryTable = React.createClass({
    render() {
        var menuitems = this.props.menuitems
        return(<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp paper max-width margin-top">
            <thead>
                <tr>
                    <th className="mdl-data-table__cell--non-numeric">date</th>
                    <th className="mdl-data-table__cell--non-numeric">Order status</th>
                    <th className="mdl-data-table__cell--non-numeric">Chef</th>
                    <th className="mdl-data-table__cell--non-numeric">Pieces</th>
                    <th className="mdl-data-table__cell--non-numeric">Sum</th>
                    <th className="mdl-data-table__cell--non-numeric">Paid</th>
                </tr>
            </thead>
            <tbody>
                {menuitems.map(function(menuitem, i) {
                    return <SummaryListItem menuitem={menuitem} key={menuitem._id}/>
                }.bind(this))}
            </tbody>
        </table>)
    }
})
