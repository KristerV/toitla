MenuItem = React.createClass({

    getInitialState() {
        return {}
    },

    publish(e) {
        Meteor.call('publishMenuitem', this.props.menuitem._id)
    },

    unpublish(e) {
        Meteor.call('unpublishMenuitem', this.props.menuitem._id)
    },

    deleteMenuitem(e) {
        var c = confirm('Kindel, et soovid kustutada toidu "' + this.props.menuitem.title + '"?')
        if (c)
            Meteor.call('deleteMenuitem', this.props.menuitem._id)
    },

    render() {
        var menuitem = this.props.menuitem
        var menuitemKey = this.props.menuitemKey
        var contents = []

        if (menuitem.inorder) {
            contents.push(<MenuItemButtonSection key={1} label="Vaheta" onClick={this.nextFood} colored={true}/>)
            contents.push(<MenuItemChef key={2} menuitem={menuitem}/>)
        } else {
            if (!menuitem.published) {
                contents.push(<MenuItemButtonSection key={3} label="avalikusta" onClick={this.publish} accented={true}/>)
            } else {
                contents.push(<MenuItemTextSection key={4} text="Toit on avalik" className="greenBack"/>)
            }
        }

        // Render
        return(
        <div className="MenuItem margin mdl-shadow--2dp inline">
            <CornerMenu menuitem={menuitem} menuitemKey={menuitemKey} unpublish={this.unpublish} deleteMenuitem={this.deleteMenuitem}/>
            <FoodThumbnail menuitem={menuitem}/>
            <MenuItemDetails menuitem={menuitem}/>
            {contents}
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
