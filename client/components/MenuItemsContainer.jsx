MenuItemsContainer = React.createClass({

    getInitialState() {
        return {}
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription
        var menuitems

        if (this.props.menuitemId) {
            subscription = Meteor.subscribe("menuitems", {_id: this.props.menuitemId})
            menuitems = MenuItems.find(this.props.menuitemId)
        } else if (this.props.orderId) {
            subscription = Meteor.subscribe("menuitems", {orderId: this.props.orderId})
            menuitems = MenuItems.find({orderId: this.props.orderId})
        } else if (this.props.chefId) {
            subscription = Meteor.subscribe("menuitems", {chefId: this.props.chefId})
            menuitems = MenuItems.find({chefId: this.props.chefId})
        } else {
            throw new Meteor.Error('MenuItemContainer.jsx: MenuItem called without any id\'s')
        }

        return {
            itemcount: Counts.get('menuitemsCount'),
            subsReady: subscription.ready(),
            menuitems: menuitems.fetch(),
        }
    },

    render() {
        var list = []

        var menuitems = this.data.menuitems
        var itemcount = this.data.itemcount
        var subsReady = this.data.subsReady

        menuitems.forEach(item => {
            list.push(<MenuItemComponent key={item._id} data={item}/>)
        })

        for (var i = list.length; i < itemcount; i++) {
            list.push(<MenuItemComponent key={'loadingItem'+i}/>)
        }

        // Render
        return(<div>
            {list}
        </div>)
    }
})
