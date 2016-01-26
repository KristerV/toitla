MenuitemsContainer = React.createClass({

    getInitialState() {
        return {
            pageLimit: this.props.pageLimitStep,
        }
    },

    getDefaultProps() {
        return {
            pageLimitStep: 30
        }
    },

    increasePageLimit() {
        var current = this.state.pageLimit
        this.setState({pageLimit: current + this.props.pageLimitStep})
        console.log(this.state.pageLimit);
    },

    filtersChange(filters) {
        var find = this.state.find

        // Format filters into 'and' conditions
        var and = []
        for (var key in filters) {
            and.push({[key]: filters[key]})
        }
        this.setState({filterList: and})
    },

    checkboxesChanged(menuitemsIds) {
        this.setState({checkedIds: menuitemsIds})
    },

    getFind() {
        var find = {published: true}
        var filterList = this.state.filterList
        var checkedIds = this.state.checkedIds

        var or = []
        if (!_.isEmpty(filterList)) {
            or.push({$and: filterList})
            if (!_.isEmpty(checkedIds))
                or.push({_id: {$in: checkedIds}}) // need this only if some filter applied
        }
        if (!_.isEmpty(or))
            find.$or = or

        return find
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription
        var menuitems

        var options = {
            limit: this.state.pageLimit
        }

        if (this.props.chefId) {
            subscription = Meteor.subscribe("menuitem_templates", {chefId: this.props.chefId})
            menuitems = MenuitemTemplates.find({chefId: this.props.chefId}, options)
        } else if (this.props.menuitemId) {
            subscription = Meteor.subscribe("menuitem_templates", {_id: this.props.menuitemId})
            menuitems = MenuitemTemplates.find({_id: this.props.menuitemId}, options)
        } else if (this.props.mode !== "addMenuitemToOrder" && (this.props.orderId || this.props.order)) {
            var orderId = this.props.orderId || this.props.order._id
            subscription = Meteor.subscribe("menuitems_inorder", {orderId: orderId})
            menuitems = MenuitemsInOrder.find({orderId: orderId, rejected: {$ne: true}}, options)
        } else {
            subscription = Meteor.subscribe("menuitem_templates")
            menuitems = MenuitemTemplates.find(this.getFind(), options)
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
        var newItems = this.state.checkedIds
        Meteor.call('menuitemInOrder--addMenuitemsArray', orderId, newItems)
        FlowRouter.go('order', {orderId: orderId})
    },

    render() {
        var menuitems = this.data.menuitems
        var subsReady = this.data.subsReady
        var itemCount = menuitems.length

        if (!subsReady)
            return <Loader/>

        var modeAction
        if (this.props.mode === 'addMenuitemToOrder')
            modeAction = this.onAddItemsToOrder

        // Render
        return(<div>
            { this.props.filters ? <MenuitemsFilters onChange={this.filtersChange}/> : null}
            { this.props.layout === 'table' ?
                <MenuitemsTable menuitems={menuitems} mode={this.props.mode} modeAction={modeAction} checkboxesChanged={this.checkboxesChanged}/>
                :
                <MenuitemsGrid chefId={this.props.chefId} menuitems={menuitems} mode={this.props.mode} modeAction={modeAction}/>
            }
            {itemCount >= this.state.pageLimit ?
                <button className="margin mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.increasePageLimit}>Load next {this.props.pageLimitStep}</button>
            : null}
        </div>)
    }
})
