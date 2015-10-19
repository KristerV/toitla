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

        // Render
        return(
        <form onSubmit={this.publish} onBlur={this.updateField} name="MenuItemForm"
                className="MenuItem margin mdl-shadow--2dp inline">
            <CornerMenu menuitem={item} menuitemKey={menuitemKey}/>
            <FoodThumbnail menuitem={item}/>
            <MenuItemDetails className="mdl-card--border" menuitem={item}/>
            <MenuItemClient className="mdl-card--border" menuitem={item}/>
            <MenuItemChef className="mdl-card--border" menuitem={item}/>
            <section className="padding">
                <input className="w100 mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="Avalikusta toit"/>
            </section>
        </form>)
    }
})
/*

<CornerMenu/> // edit, unpublish, delete
<FoodThumbnail menuitem={item}/> // add, remove
<MenuItemDetails className="mdl-card--border" menuitem={item}/> // text, tags
<MenuItemClient className="mdl-card--border" menuitem={item}/> // next, rating, comment
<MenuItemChef className="mdl-card--border" menuitem={item}/> // accept, decline, archive
*/
