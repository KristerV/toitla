OrderManagerContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders", this.props.orderId)
        var order = Orders.findOne(this.props.orderId)

        return {
            order: order,
            subsReady: subscription.ready()
        }
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>

        if (Roles.userIsInRole(Meteor.userId(), 'manager')) {
            switch (this.props.tab) {
                case 'status': return(<OrderManagerStatus order={this.data.order}/>)
                case 'info': return(<OrderManagerInfo order={this.data.order}/>)
                case 'menu': return(<OrderManagerMenu order={this.data.order}/>)
                case 'equipment': return(<OrderManagerEquipment order={this.data.order}/>)
            }
        }
        else if (Roles.userIsInRole(Meteor.userId(), 'chef'))
            return(<OrderManagerChef order={this.data.order}/>)

        return <h3 className="text-white text-center">You're not allowed here</h3>
    }
})
