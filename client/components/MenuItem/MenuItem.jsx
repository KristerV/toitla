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
        var menuItemKey = this.props.menuItemKey

        // Render
        return(
        <form onSubmit={this.publish} onBlur={this.updateField} name="MenuItemForm"
                className="MenuItem margin mdl-shadow--2dp">
            <CornerMenu menuItem={item} menuItemKey={menuItemKey}/>
            <FoodThumbnail menuItem={item}/>
            <MenuItemDetails className="mdl-card--border" menuItem={item}/>
            <MenuItemClient className="mdl-card--border" menuItem={item}/>
            <MenuItemChef className="mdl-card--border" menuItem={item}/>
            <section className="padding">
                <input className="w100 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Avalikusta toit"/>
            </section>
        </form>)
    }
})
/*

<CornerMenu/> // edit, unpublish, delete
<FoodThumbnail menuItem={item}/> // add, remove
<MenuItemDetails className="mdl-card--border" menuItem={item}/> // text, tags
<MenuItemClient className="mdl-card--border" menuItem={item}/> // next, rating, comment
<MenuItemChef className="mdl-card--border" menuItem={item}/> // accept, decline, archive
*/
