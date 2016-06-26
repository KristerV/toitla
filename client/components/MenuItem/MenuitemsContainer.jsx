import React from 'react';
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
        var find = this.props.find || {}
        find.published = find.published || true
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
            limit: this.state.pageLimit,
            sort: {publishDate: -1}
        }

        var chefId = this.props.chefId
        var menuitemId = this.props.menuitemId
        var orderId = this.props.orderId
        var addToOrdermode = FlowRouter.current().route.name === 'menus-addItem'

        if (chefId) {
            options.chefId = chefId
            subscription = Meteor.subscribe("menuitem_templates", {chefId: chefId}, options)
            menuitems = MenuitemTemplates.find().fetch()
        } else if (menuitemId) {
            subscription = Meteor.subscribe("menuitem_templates", {_id: menuitemId}, options)
            menuitems = MenuitemTemplates.find().fetch()
        } else if (addToOrdermode && orderId) {
            subscription = Meteor.subscribe("menuitem_templates")
            subscription2 = Meteor.subscribe("menuitems_inorder", this.getFind(), options)
            menuitems = MenuitemTemplates.find().fetch()
            itemsInOrder = MenuitemsInOrder.find({orderId: orderId, rejected: {$ne: true}}).fetch()

            for (var i = 0; i < menuitems.length; i++) {
                for (var j = 0; j < itemsInOrder.length; j++) {
                    if (menuitems[i]._id === itemsInOrder[j].templateId)
                        menuitems[i].inOrderItemId = itemsInOrder[j]._id
                }
            }

        } else if (orderId) {
            var find = {orderId: orderId, rejected: {$ne: true}}
            subscription = Meteor.subscribe("menuitems_inorder", find, options)
            menuitems = MenuitemsInOrder.find().fetch()
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
        return(<div className="max-width margin-bottom">
            { this.props.filters ? <MenuitemsFilters onChange={this.filtersChange}/> : null}
            { this.props.layout === 'table' ?
                <MenuitemsTable menuitems={menuitems}/>
                :
                <MenuitemsGrid chefId={this.props.chefId} menuitems={menuitems}/>
            }
            {itemCount >= this.state.pageLimit ?
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored w100 margin-bottom" onClick={this.increasePageLimit}>Load next {this.props.pageLimitStep}</button>
            : null}
        </div>)
    }
})
