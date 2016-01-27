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

        var chefId = this.props.chefId
        var menuitemId = this.props.menuitemId
        var orderId = this.props.orderId
        var addToOrdermode = FlowRouter.current().route.name === 'menus-addItem'

        if (chefId) {
            subscription = Meteor.subscribe("menuitem_templates", {chefId: chefId})
            menuitems = MenuitemTemplates.find({chefId: chefId}, options).fetch()
        } else if (menuitemId) {
            subscription = Meteor.subscribe("menuitem_templates", {_id: menuitemId})
            menuitems = MenuitemTemplates.find({_id: menuitemId}, options).fetch()
        } else if (addToOrdermode && orderId) {
            subscription = Meteor.subscribe("menuitem_templates")
            subscription2 = Meteor.subscribe("menuitems_inorder")
            menuitems = MenuitemTemplates.find(this.getFind(), options).fetch()
            itemsInOrder = MenuitemsInOrder.find({orderId: orderId, rejected: {$ne: true}}).fetch()

            for (var i = 0; i < menuitems.length; i++) {
                for (var j = 0; j < itemsInOrder.length; j++) {
                    if (menuitems[i]._id === itemsInOrder[j].templateId)
                        menuitems[i].inOrderItemId = itemsInOrder[j]._id
                }
            }

        } else if (orderId) {
            subscription = Meteor.subscribe("menuitems_inorder", orderId)
            menuitems = MenuitemsInOrder.find({orderId: orderId, rejected: {$ne: true}}, options).fetch()
        } else {
            subscription = Meteor.subscribe("menuitem_templates")
            menuitems = MenuitemTemplates.find(this.getFind(), options).fetch()
        }

        // HACK: hide loading spinner for OrderMenuForm.jsx when price changes
        $('#calculating-price-loader').removeClass('force-visible')

        return {
            subsReady: subscription.ready(),
            menuitems: menuitems,
        }
    },


    render() {
        var menuitems = this.data.menuitems
        var itemCount = menuitems.length

        if (!this.data.subsReady)
            return <Loader/>

        // Render
        return(<div>
            { this.props.filters ? <MenuitemsFilters onChange={this.filtersChange}/> : null}
            { this.props.layout === 'table' ?
                <MenuitemsTable menuitems={menuitems}/>
                :
                <MenuitemsGrid chefId={this.props.chefId} menuitems={menuitems}/>
            }
            {itemCount >= this.state.pageLimit ?
                <button className="margin mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.increasePageLimit}>Load next {this.props.pageLimitStep}</button>
            : null}
        </div>)
    }
})
