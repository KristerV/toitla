OrderManagerContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        let driver = this.props.tab === 'driver' && !Meteor.userId()
        var subscription = Meteor.subscribe("orders", this.props.orderId, driver)
        var order = Orders.findOne(this.props.orderId)

        return {
            order: order,
            subsReady: subscription.ready()
        }
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>

        // Manager
        if (Roles.userIsInRole(Meteor.userId(), 'manager')) {
            switch (this.props.tab) {
                case 'status': return(<OrderManagerStatus order={this.data.order}/>)
                case 'info': return(<OrderManagerInfo order={this.data.order}/>)
                case 'menu': return(<OrderManagerMenu order={this.data.order}/>)
                case 'signs': return(<OrderManagerSigns order={this.data.order}/>)
                case 'equipment': return(<OrderManagerEquipment order={this.data.order}/>)
                case 'driver': return(<OrderManagerDriver order={this.data.order}/>)
            }
        }

        // Chef
        else if (Roles.userIsInRole(Meteor.userId(), 'chef'))
            return(<OrderManagerChef order={this.data.order}/>)

        // Anonymous
        else {
            switch (this.props.tab) {
                case 'driver': return(<Driver order={this.data.order}/>)
            }
        }

        return <h3 className="text-white text-center">You're not allowed here</h3>
    }
})
