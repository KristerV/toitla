MenuitemsContainer = React.createClass({

    getInitialState() {
        return {find: {}}
    },

    filtersChange(obj) {
        this.setState({find: obj})
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription
        var menuitems

        if (this.props.chefId) {
            subscription = Meteor.subscribe("menuitem_templates", {chefId: this.props.chefId})
            menuitems = MenuitemTemplates.find({chefId: this.props.chefId})
        } else if (this.props.menuitemId) {
            subscription = Meteor.subscribe("menuitem_templates", {_id: this.props.menuitemId})
            menuitems = MenuitemTemplates.find({_id: this.props.menuitemId})
        } else if (this.props.mode !== "addMenuitemToOrder" && (this.props.orderId || this.props.order)) {
            var orderId = this.props.orderId || this.props.order._id
            subscription = Meteor.subscribe("menuitems_inorder", {orderId: orderId})
            menuitems = MenuitemsInOrder.find({orderId: orderId, rejected: {$ne: true}})
        } else {
            subscription = Meteor.subscribe("menuitem_templates")
            menuitems = MenuitemTemplates.find(this.state.find)
        }

        // HACK: hide loading spinner for OrderMenuForm.jsx when price changes
        $('#calculating-price-loader').removeClass('force-visible')

        return {
            subsReady: subscription.ready(),
            menuitems: menuitems.fetch(),
        }
    },

    onAddItemsToOrder(e) {
        var orderId = this.props.orderId
        var newItems = []
        $('table .mdl-js-checkbox').each(function(){
            if ($(this).find("input[type=checkbox]").is(":checked"))
                newItems.push(this.id)
        })
        Meteor.call('menuitemInOrder--addArray', orderId, newItems)
        FlowRouter.go('order', {orderId: orderId})
    },

    render() {
        var menuitems = this.data.menuitems
        var subsReady = this.data.subsReady

        if (!subsReady)
            return <Loader/>

        var modeAction
        if (this.props.mode === 'addMenuitemToOrder')
            modeAction = this.onAddItemsToOrder

        // Render
        return(<div>
            { this.props.filters ? <MenuitemsFilters onChange={this.filtersChange}/> : null}
            { this.props.layout === 'table' ?
                <MenuitemsTable menuitems={menuitems} mode={this.props.mode} modeAction={modeAction}/>
                :
                <MenuitemsGrid menuitems={menuitems} mode={this.props.mode} modeAction={modeAction}/>
            }
        </div>)
    }
})
