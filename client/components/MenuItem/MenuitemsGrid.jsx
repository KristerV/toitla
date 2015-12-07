MenuitemsGrid = React.createClass({
    render() {
        var singleItem = this.props.menuitems.length > 0 ? this.props.menuitems[0] : {}
        return(<div className="mdl-grid">
            {this.props.menuitems.map(function(item, i){
                return <MenuitemInGrid key={item._id} menuitemKey={item._id} menuitem={item}/>
            })}
            <MenuitemButtonAdd chefId={singleItem.chefId}
                orderId={singleItem.orderId}/>
        </div>)
    }
})