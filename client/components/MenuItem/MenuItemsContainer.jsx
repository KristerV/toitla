MenuItemsContainer = React.createClass({

    getInitialState() {
        return {}
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription
        var menuitems

        if (this.props.chefId) {
            subscription = Meteor.subscribe("menuitem_templates")
            menuitems = MenuItemTemplates.find({chefId: this.props.chefId}).fetch()
        }

        // if (this.props.menuitemId) {
        //     subscription = Meteor.subscribe("menuitems", {_id: this.props.menuitemId})
        //     menuitems = MenuItemTemplates.find(this.props.menuitemId)
        // } else if (this.props.orderId) {
        //     subscription = Meteor.subscribe("menuitems", {orderId: this.props.orderId})
        //     menuitems = MenuItemTemplates.find({orderId: this.props.orderId})
        // } else if (this.props.chefId) {
            // subscription = Meteor.subscribe("menuitems", {chefId: this.props.chefId})
            // menuitems = MenuItemTemplates.find({chefId: this.props.chefId})
        // } else {
        //     throw new Meteor.Error('MenuItemContainer.jsx: MenuItem called without any id\'s')
        // }

        return {
            itemcount: Counts.get('MenuItemTemplatesCount'),
            subsReady: subscription.ready(),
            menuitems: menuitems,
        }
    },

    newMenuItemTemplate() {
        Meteor.call('newMenuItemTemplate', this.props.chefId)
    },

    render() {
        var list = []
        var menuitems = this.data.menuitems
        var itemcount = this.data.itemcount
        var subsReady = this.data.subsReady

        // Push component
        menuitems.forEach(item => {
            list.push(<MenuItem key={item._id} menuItemKey={item._id} menuitem={item}/>)
        })

        // Preloader: push empty component based on count
        for (var i = list.length; i < itemcount; i++) {
            list.push(<MenuItem key={'loadingItem'+i} menuItemKey={'loadingItem'+i}/>)
        }

        // Render
        return(<div className="MenuItemContainer">
            {list}
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.newMenuItemTemplate}>Lisa uus toit</button>
        </div>)
    }
})
