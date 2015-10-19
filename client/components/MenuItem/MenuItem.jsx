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
            contents.push(<MenuItemButtonSection key={1} label="Vaheta" onClick={this.nextFood} colored={true}/>)
            contents.push(<MenuItemChef key={2} menuitem={item}/>)
        } else {
            if (!item.published) {
                contents.push(<MenuItemButtonSection key={3} label="avalikusta" onClick={this.publish} accented={true}/>)
            } else {
                contents.push(<MenuItemTextSection key={4} text="Toit on avalik" className="greenBack"/>)
            }
        }

        // Render
        return(
        <div className="MenuItem margin mdl-shadow--2dp inline">
            <CornerMenu menuitem={item} menuitemKey={menuitemKey} unpublish={this.unpublish}/>
            <FoodThumbnail menuitem={item}/>
            <MenuItemDetails menuitem={item}/>
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
