SummaryListItem = React.createClass({
    render() {
        var menuitem = this.props.menuitem
        var className = ""
        if (menuitem.orderStatus === 'done')
            className += " bg-green"
        else if (menuitem.orderStatus === 'lost')
            className += " bg-red"
        return(<tr className={className}>
                <td>{moment(menuitem.dueDate).format("D.MM.YY")}</td>
                <td>{Settings.phases[menuitem.orderStatus].label}</td>
                <td>{menuitem.chefName}</td>
                <td>{menuitem.totalPieces}</td>
                <td>{menuitem.totalPrice}</td>
                <td>X</td>
            </tr>)
    }
})
