MenuItemsListContainer = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("menuitem_templates")
        var menuitems = MenuItemTemplates.find().fetch()
        return {
            subsReady: subscription.ready(),
            menuitems: menuitems,
        }
    },
    render() {
        if (!this.data.subsReady)
            return <Loader/>
        return(<div className="max-width">
            <MenuItemsList menuitems={this.data.menuitems}/>
        </div>)
    }
})
