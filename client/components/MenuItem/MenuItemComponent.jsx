MenuItemComponent = React.createClass({

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
                className="MenuItemComponent container mdl-shadow--2dp">
            <CornerMenu menuItem={item} menuItemKey={menuItemKey}/>
            <FoodThumbnail menuItem={item}/>
            <MenuItemDetails className="mdl-card--border" menuItem={item}/>
            <MenuItemClient className="mdl-card--border" menuItem={item}/>
            <MenuItemChef className="mdl-card--border" menuItem={item}/>
            <input className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit" value="publish"/>
        </form>)
    }
})
/*

<CornerMenu/> // edit, unpublish, delete
<FoodThumbnail menuItem={item}/> // add, remove
<MenuItemDetails className="mdl-card--border" menuItem={item}/> // text, tags
<MenuItemClient className="mdl-card--border" menuItem={item}/> // next, rating, comment
<MenuItemChef className="mdl-card--border" menuItem={item}/> // accept, decline, archive



<div class="demo-card-wide ">
  <div class="mdl-card__title">
    <h2 class="mdl-card__title-text">Welcome</h2>
  </div>
  <div class="mdl-card__supporting-text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Mauris sagittis pellentesque lacus eleifend lacinia...
  </div>
  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      Get Started
    </a>
  </div>
  <div class="mdl-card__menu">
    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
      <i class="material-icons">share</i>
    </button>
  </div>
</div>*/
