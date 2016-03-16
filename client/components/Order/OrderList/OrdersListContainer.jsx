OrdersListContainer = React.createClass({

    getInitialState() {
        return {
            showOnlyCompleted: false,
        }
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders")

        var find = {}
        if (this.state.showOnlyCompleted)
            find.$and = [{'result.result': {$ne: null}}, {result: {$exists: 1}}]
        else
            find.$or = [{'result.result': null}, {result: {$exists: 0}}]

        var options = {sort: {"event.fromDate": 1, "event.fromTime": 1}}
        
        return {
            orders: Orders.find(find, options).fetch(),
            subsReady: subscription.ready()
        }
    },

    switchShowAll() {
        this.setState({showOnlyCompleted: !this.state.showOnlyCompleted})
    },

    render() {
        if (this.data.subsReady)
            return <OrderList orders={this.data.orders} switchShowAll={this.switchShowAll} showOnlyCompleted={this.state.showOnlyCompleted}/>
        else
            return <Loader/>
    }
})
