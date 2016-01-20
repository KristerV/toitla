SummaryContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("menuitems_inorder")
        var menuitems = MenuitemsInOrder.find({}, {sort: {'dueDate': 1, 'orderId': -1}}).fetch()
        return {
            subsReady: subscription.ready(),
            menuitems: menuitems
        }
    },

    render() {
        if (this.data.subsReady) {
            // Group by order
            var menuitemsObj = {}
            this.data.menuitems.forEach(function(item, i){
                var key = item.chefName + item.orderId
                if (menuitemsObj[key]) {
                    menuitemsObj[key].totalPrice += item.amount * item.price
                    menuitemsObj[key].totalPieces += item.amount
                } else {
                    item.totalPieces = item.amount
                    item.totalPrice = parseInt(item.amount * item.price * 100) / 100
                    // item.sorter = i
                    menuitemsObj[key] = item
                }
            })

            // Convert back to array
            var menuitems = _.map(menuitemsObj, function(item){
                return item
            })
            console.log(menuitems);
            // menuitems = _.sortBy(menuitems, 'sorter')
            return <SummaryTable menuitems={menuitems}/>
        } else
            return <Loader/>
    }
})
