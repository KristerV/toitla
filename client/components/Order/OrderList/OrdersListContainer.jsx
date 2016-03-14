OrdersListContainer = React.createClass({

    getInitialState() {
        return {
            showAllOrders: false,
        }
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders")

        var find = {}
        if (this.state.showAllOrders)
            find.result = {$exists: 1}
        else
            find.$or = [{'result.result': null}, {result: {$exists: 0}}]

        var options = {sort: {"event.fromDate": 1, "event.fromTime": 1}}
        
        return {
            orders: Orders.find(find, options).fetch(),
            subsReady: subscription.ready()
        }
    },

    switchShowAll() {
        this.setState({showAllOrders: !this.state.showAllOrders})
    },

    render() {
        if (this.data.subsReady)
            return <OrderList orders={this.data.orders} switchShowAll={this.switchShowAll} showAllOrders={this.state.showAllOrders}/>
        else
            return <Loader/>
    }
})
