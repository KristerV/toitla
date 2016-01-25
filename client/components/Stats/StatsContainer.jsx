StatsContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe('orders')
        var startDate = moment().subtract(1, 'month').toDate()
        var endDate = moment().add(1, 'month').toDate()
        var orders = Orders.find(
            {
                'status.phase': {
                    $nin: ['lost']
                }, 'event.fromDate': {
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
