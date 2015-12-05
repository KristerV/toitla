MenuitemInGrid = React.createClass({

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

    removeFromOrder(e) {
        Meteor.call('menuitemInOrder--removeItem', this.props.menuitem._id)
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
                extraSections.push(<MenuitemInGridChef key={2} menuitem={menuitem}/>)
            else if (menuitem.originalSpecifications)
                extraSections.push(<MenuitemInGridButtonSection key={1} label="Vaheta" onClick={this.nextFood} colored={true}/>)
        } else {
            if (!menuitem.published) {
                extraSections.push(<MenuitemInGridButtonSection key={3} label="avalikusta" onClick={this.publish} accented={true}/>)
            } else {
                extraSections.push(<MenuitemInGridTextSection key={4} text="Toit on avalik" className="greenBack"/>)
            }
        }

        var options = []
        if (menuitem.inorder) {
            options.push({ label: 'remove from order', onClick: this.removeFromOrder})
        } else if (menuitem.published) {
            options.push({ label: 'change', onClick: this.unpublish})
        } else if (!menuitem.published && !menuitem.inorder) {
            options.push({ label: 'delete', onClick: this.deleteMenuitem})
        }

        // Render
        return(
        <div className="MenuitemGrid mdl-shadow--2dp paper mdl-cell mdl-cell--4-col">
            <CornerMenu options={options}/>
            <MenuitemInGridFoodThumbnail menuitem={menuitem}/>
            <MenuitemInGridDetails menuitem={menuitem}/>
            {extraSections}
        </div>)
    }
})
