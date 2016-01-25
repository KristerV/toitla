StatsContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe('orders')
        var startDate = moment().subtract(37, 'days').toDate()
        var endDate = moment().add(30, 'days').toDate()
        var orders = Orders.find(
            {
                'event.fromDate': {
                    $gt: startDate,
                    $lt: endDate,
                    $exists: 1
                },
            }, {
                sort: {
                    'event.fromDate': 1
                }
            }).fetch()
        return {
            subsReady: subscription.ready(),
            orders: orders
        }
    },

    render() {
        if (this.data.subsReady)
            return (<Stats orders={this.data.orders}/>)
        else
            return <Loader/>
    }

})
