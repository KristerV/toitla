MenuItemsList = React.createClass({
    render() {
        var menuitems = this.props.menuitems
        return(<div>{menuitems.map(function(menuitem, i){
            return <MenuItemsListItem key={i} menuitem={menuitem}/>
        })}</div>)
    }
})
