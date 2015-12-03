MenuItemsContainer = React.createClass({

    getInitialState() {
        return {}
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription
        var menuitems

        if (this.props.chefId) {
            subscription = Meteor.subscribe("menuitem_templates", {chefId: this.props.chefId})
            menuitems = MenuItemTemplates.find({chefId: this.props.chefId})
        } else if (this.props.orderId || this.props.order) {
            var orderId = this.props.orderId || this.props.order._id
            subscription = Meteor.subscribe("menuitems_inorder", {orderId: orderId})
            menuitems = MenuItemsInOrder.find({orderId: orderId, rejected: {$ne: true}})
        }

        // HACK: hide loading spinner for OrderMenuForm.jsx when price changes
        $('#calculating-price-loader').removeClass('force-visible')

        return {
            subsReady: subscription.ready(),
            menuitems: menuitems.fetch(),
        }
    },

    newMenuitemTemplate() {
        Meteor.call('menuitemTemplate--new', this.props.chefId)
    },

    newMenuitemInOrder() {
        // redirect to menues with onClick function
        var orderId = this.props.orderId || this.props.order._id
        FlowRouter.go("menus-addItem", {orderId: orderId})
    },

    render() {
        var menuitems = this.data.menuitems
        var subsReady = this.data.subsReady
        var route = FlowRouter.current().route.name
        var buttonLabel
        var buttonAction
        if (Meteor.userId()) {
            if (route === "menu") {
                buttonLabel = "Create new food"
                buttonAction = this.newMenuitemTemplate
            } else if (route === "order") {
                buttonLabel = "Add food"
                buttonAction = this.newMenuitemInOrder
            }
        }

        // Render
        return(<div className="MenuItemsContainer mdl-grid">
            {menuitems.map(item => {
                return <MenuItem key={item._id} menuitemKey={item._id} menuitem={item}/>
            })}
            {buttonLabel && buttonAction ?
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                    onClick={buttonAction}>
                        {buttonLabel}
                </button>
            : null}
        </div>)
    }
})
