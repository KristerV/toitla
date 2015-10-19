MenuItem = React.createClass({

    getInitialState() {
        return {}
    },

    publish(e) {
        e.preventDefault()
        console.log("menu item published");
    },
    updateField(e) {
        console.log("updateField");
    },

    render() {
        var item = this.props.menuitem
        var placeholder = !item
        var editMode = placeholder ? false : !item.published
        var menuitemKey = this.props.menuitemKey
        var contents = []

        if (item.inorder) {
            contents.push(<MenuItemClient className="mdl-card--border" menuitem={item}/>)
            contents.push(<MenuItemChef className="mdl-card--border" menuitem={item}/>)
        } else {
            contents.push(<MenuItemChefTemplate className="mdl-card--border"/>)
        }

        // Render
        return(
        <div className="MenuItem margin mdl-shadow--2dp inline">
            <CornerMenu menuitem={item} menuitemKey={menuitemKey}/>
            <FoodThumbnail menuitem={item}/>
            <MenuItemDetails className="mdl-card--border" menuitem={item}/>
            {contents}
        </div>)
    }
})
/*

<CornerMenu/> // edit, unpublish, delete
<FoodThumbnail menuitem={item}/> // add, remove
<MenuItemDetails className="mdl-card--border" menuitem={item}/> // text, tags
<MenuItemClient className="mdl-card--border" menuitem={item}/> // next, rating, comment
<MenuItemChef className="mdl-card--border" menuitem={item}/> // accept, decline, archive
*/
