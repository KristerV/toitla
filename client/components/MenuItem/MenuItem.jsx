MenuItem = React.createClass({

    getInitialState() {
        return {}
    },

    publish(e) {
        Meteor.call('menuitemTemplate--publish', this.props.menuitem._id)
    },

    unpublish(e) {
        Meteor.call('menuitemTemplate--unpublish', this.props.menuitem._id)
    },

    deleteMenuitem(e) {
        var c = confirm('Kindel, et soovid kustutada toidu "' + this.props.menuitem.title + '"?')
        if (c)
            Meteor.call('menuitemTemplate--delete', this.props.menuitem._id)
    },

    nextFood(e) {
        Meteor.call("menuitemInOrder--switchItem", this.props.menuitem._id)
    },

    render() {
        var menuitem = this.props.menuitem
        var menuitemKey = this.props.menuitemKey
        var extraSections = []

        if (menuitem.inorder) {
            if (menuitem.chefId === Meteor.userId())
                extraSections.push(<MenuItemChef key={2} menuitem={menuitem}/>)
            else
                extraSections.push(<MenuItemButtonSection key={1} label="Vaheta" onClick={this.nextFood} colored={true}/>)
        } else {
            if (!menuitem.published) {
                extraSections.push(<MenuItemButtonSection key={3} label="avalikusta" onClick={this.publish} accented={true}/>)
            } else {
                extraSections.push(<MenuItemTextSection key={4} text="Toit on avalik" className="greenBack"/>)
            }
        }

        // Render
        return(
        <div className="MenuItem mdl-shadow--2dp paper mdl-cell mdl-cell--4-col">
            <CornerMenu menuitem={menuitem} menuitemKey={menuitemKey} unpublish={this.unpublish} deleteMenuitem={this.deleteMenuitem}/>
            <FoodThumbnail menuitem={menuitem}/>
            <MenuItemDetails menuitem={menuitem}/>
            {extraSections}
        </div>)
    }
})
/*

<CornerMenu/> // edit, unpublish, delete
<FoodThumbnail menuitem={item}/> // add, remove
<MenuItemDetails menuitem={item}/> // text, tags
<MenuItemClient menuitem={item}/> // next, rating, comment
<MenuItemChef menuitem={item}/> // accept, decline, archive
*/
