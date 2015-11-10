GuestAllergyContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("guest_allergy_order", this.props.allergyId)
        var order = Orders.findOne({"allergies._id": this.props.allergyId})

        return {
            order: order,
            subsReady: subscription.ready()
        }
    },

    render() {
        return(<OrderGuestAllergyForm order={this.data.order}/>)
    }
})
